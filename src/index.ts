// import { compress } from './image';
// import path from 'path';

// compress.compress_dir({
//   quality: 80,
// })(
//   path.resolve(process.cwd(), 'resources', 'images'),
//   path.resolve(process.cwd(), 'output', 'images')
// );

const rowRenderCreator =
  (configs: { lengths: number[] }) => (data: string[]) => {
    return `|${data
      .map((item, index) =>
        item?.toString()?.padEnd(configs.lengths[index], ' ')
      )
      .join('|')}|`;
  };

const table = (
  columns: { data_index: string; title: string }[],
  data: any[]
) => {
  const lengths = columns.map((column) => {
    let len = column.title.length;
    data.forEach((item) => {
      len = Math.max(len, item[column.data_index]?.toString().length);
    });
    return len;
  });
  const lines = (num: number) => '-'.repeat(num);
  const count = lengths.reduce((a, b) => a + b, 0) + columns.length + 1;
  const row = rowRenderCreator({ lengths });
  const rows = [
    lines(count),
    row(columns.map((column) => column.title)),
    data.map((item) => {
      return `${lines(count)}\n${row(
        columns.map((column) => item[column.data_index])
      )}`;
    }),
    lines(count),
  ];
  return rows.join('\n');
};

console.log(
  table(
    [
      { data_index: 'name', title: 'Name' },
      { data_index: 'age', title: 'Age' },
      { data_index: 'address', title: 'Address' },
    ],
    [{ name: 'John', age: 30, address: '123 Main St' }]
  )
);
