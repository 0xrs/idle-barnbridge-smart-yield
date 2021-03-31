pragma solidity 0.7.6;
interface IIdleController {
  function idleSpeeds(address _idleToken) external view returns (uint256);
  function claimIdle(address[] calldata holders, address[] calldata idleTokens) external;
}
