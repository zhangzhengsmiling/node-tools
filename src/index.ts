import { compress } from './image';
import path from 'path';
import { table } from './logger';

const promise_results = compress.compress_dir({
  quality: 80,
})(
  path.resolve(process.cwd(), 'resources', 'images'),
  path.resolve(process.cwd(), 'output', 'images')
);

Promise.all(promise_results).then((compressed_infos) => {
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
