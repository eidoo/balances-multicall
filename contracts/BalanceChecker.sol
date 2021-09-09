// NOTE: taken from here: https://etherscan.io/address/0xb1f8e55c7f64d203c1400b9d8555d050f94adf39#code
pragma solidity ^0.4.21;

interface ERC20 {
    function balanceOf(address) public view returns (uint256);
}

contract BalanceChecker {
    function() public payable {
        revert();
    }

    function tokenBalance(address user, address token) public view returns (uint256) {
        uint256 tokenCode;
        assembly {
            tokenCode := extcodesize(token)
        }

        if (tokenCode > 0 && token.call(bytes4(0x70a08231), user)) {
            return ERC20(token).balanceOf(user);
        } else {
            return 0;
        }
    }

    function balances(address[] users, address[] tokens) external view returns (uint256[]) {
        uint256[] memory addrBalances = new uint256[](tokens.length * users.length);

        for (uint256 i = 0; i < users.length; i++) {
            for (uint256 j = 0; j < tokens.length; j++) {
                uint256 addrIdx = j + tokens.length * i;
                if (tokens[j] != address(0x0)) {
                    addrBalances[addrIdx] = tokenBalance(users[i], tokens[j]);
                } else {
                    addrBalances[addrIdx] = users[i].balance;
                }
            }
        }

        return addrBalances;
    }
}
