export const asJPY = (num: number) => `${num < 0 ? '▲' : ''}\xA5${Math.abs(num).toLocaleString('jp-JP')}`;
