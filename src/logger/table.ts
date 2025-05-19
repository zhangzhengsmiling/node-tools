import { add } from '../math';
const char_space_count = (char: string) =>
  /[a-zA-Z]|[0-9]|[ ,;.!@#-+/\\$%^*()<>?:"'{}~]/i.test(char) ? 1 : 2;
const space_count = (str: string) =>
  str?.toString().split('').map(char_space_count).reduce(add, 0);
const row_render_creator =
  (configs: { lengths: number[] }) => (data: string[]) => {
    return `|${data
      .map(
        (item, index) =>
          item?.toString() +
          ' '.repeat(configs.lengths[index] - space_count(item))
      )
      .join('|')}|`;
  };

export const table = (
  columns: { data_index: string; title: string }[],
  data: any[]
) => {
  const lengths = columns.map((column) =>
    data.reduce(
      (acc, cur) =>
        Math.max(acc, space_count(cur[column.data_index]?.toString())),
      space_count(column.title)
    )
  );
  const lines = (num: number) => '-'.repeat(num);
  const count = lengths.reduce((a, b) => a + b, 0) + columns.length + 1;
  const row = row_render_creator({ lengths });
  const rows = [
    lines(count),
    row(columns.map((column) => column.title)),
    data.map(
      (item) =>
        `${lines(count)}\n${row(
          columns.map((column) => item[column.data_index])
        )}`
    ),
    lines(count),
  ];
  return rows.join('\n');
};
