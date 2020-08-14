function rand4HexStr() {
  return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
}

export default function() {
  return `${rand4HexStr() + rand4HexStr()}-${rand4HexStr()}-${rand4HexStr()}-${
    rand4HexStr()}-${rand4HexStr()}${rand4HexStr()}${rand4HexStr()}`;
}
