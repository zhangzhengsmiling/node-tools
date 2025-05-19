// import { compress } from './image';
// import path from 'path';
import { table } from './logger';

// compress.compress_dir({
//   quality: 80,
// })(
//   path.resolve(process.cwd(), 'resources', 'images'),
//   path.resolve(process.cwd(), 'output', 'images')
// );

console.log(
  table(
    [
      { data_index: 'name', title: '长文本测试' },
      { data_index: 'age', title: 'Age' },
      { data_index: 'address', title: 'Address' },
    ],
    [{ name: 'a', age: 30, address: '123 Main St' }]
  )
);
