import { program } from 'commander';
import { compress } from '../image';
import { table } from '../logger';
import path from 'path';

program
  .version('0.0.1')
  .option('-i, --input <input>', 'input directory')
  .option('-o, --output <output>', 'output directory')
  .option('-q, --quality <quality>', 'quality', parseInt)
  .parse(process.argv);

const options = program.opts();
const results = compress.compress_dir({
  quality: options.quality || 80,
})(
  path.resolve(process.cwd(), options.input),
  path.resolve(process.cwd(), options.output)
);

Promise.all(results).then((compressed_infos) => {
  console.log(
    table(
      [
        { data_index: 'id', title: 'ID' },
        {
          data_index: 'before',
          title: '压缩前',
          format: (d: any, r: any, i: number) => compress.size(r.before.size),
        },
        {
          data_index: 'after',
          title: '压缩后',
          format: (d: any, r: any, i: number) => compress.size(r.after.size),
        },
      ],
      compressed_infos
    )
  );
});
