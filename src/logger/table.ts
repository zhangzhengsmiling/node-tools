import { add } from '../math';
// const char_space_count = (char: string) =>
//   /[a-zA-Z]|[0-9]|[ ,;.!@#-+/\\$%^*()<>?:"'{}~]/i.test(char) ? 1 : 2;
const char_space_count = (
  char: string // 中文算2个字符，英文算1个字符
) => (char.charCodeAt(0) > 255 ? 2 : 1);
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

export const table = <ADT extends { [key: string]: any }>(
  columns: {
    data_index: string;
    title: string;
    format?: (d: any, r: ADT, i: number) => string | number;
  }[],
  data: ADT[]
) => {
  const formatter = (
    column: (typeof columns)[number],
    d: any,
    r: ADT,
    i: number
  ) => {
    if (column.format) return column.format(d, r, i);
    return d;
  };

  const lengths = columns.map((column) =>
    data.reduce(
      (acc, cur, i) =>
        Math.max(
          acc,
          space_count(
            formatter(column, cur[column.data_index], cur, i)?.toString()
          )
        ),
      space_count(column.title)
    )
  );
  const lines = (num: number) => '-'.repeat(num);
  const count = lengths.reduce((a, b) => a + b, 0) + columns.length + 1;
  const row = row_render_creator({ lengths });
  const rows = [
    lines(count),
    row(columns.map((column) => column.title)),
    data
      .map(
        (r, i) =>
          `${lines(count)}\n${row(
            columns.map((column) =>
              formatter(column, r[column.data_index], r, i)
            )
          )}`
      )
      .join('\n'),
    lines(count),
  ];
  return rows.join('\n');
};
