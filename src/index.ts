import { compress } from './image';
import path from 'path';

compress.compress_dir({
  quality: 80,
})(
  path.resolve(process.cwd(), 'resources', 'images'),
  path.resolve(process.cwd(), 'output', 'images')
);
