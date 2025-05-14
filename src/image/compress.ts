import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

interface CompressConfig {
  quality: number;
}

// 单张图片压缩
export const compress_creator =
  (compress_config: CompressConfig) => (path: string, out: string) => {
    const _sharper = sharp(path);
    const formatter: { [key: string]: any } = {
      png: _sharper.png.bind(_sharper),
      jpg: _sharper.jpeg.bind(_sharper),
      webp: _sharper.webp.bind(_sharper),
    };
    return _sharper.metadata().then((metadata) => {
      if (!metadata.format) throw new Error('Format not supported');
      const format = formatter[metadata.format];
      if (!format) throw new Error('Format not supported');
      return format({
        quality: compress_config.quality,
      }).toFile(out);
    });
  };

// 目录压缩
export const compress_dir =
  (compress_config: CompressConfig) => (path_dir: string, out_dir: string) => {
    return fs.readdirSync(path_dir).map((file) => {
      compress_creator(compress_config)(
        path.resolve(path_dir, file),
        path.resolve(out_dir, file)
      ).then(() => {
        display_compress_rate(
          file,
          path.resolve(path_dir, file),
          path.resolve(out_dir, file)
        );
      });
    });
  };

// 转换size
const size = (byte: number) => {
  if (byte < 1024) return `${byte}B`;
  if (byte < 1024 * 1024) return `${(byte / 1024).toFixed(2)}KB`;
  if (byte < 1024 * 1024 * 1024) return `${(byte / 1024 / 1024).toFixed(2)}MB`;
  return `${(byte / 1024 / 1024 / 1024).toFixed(2)}GB`;
};

// 打印压缩日志
export const display_compress_rate = (id: string, from: string, to: string) => {
  Promise.all([fs.promises.stat(from), fs.promises.stat(to)]).then(
    ([from, to]) => {
      console.log(
        `ID: ${id} 压缩前: ${size(from.size)} 压缩后: ${size(to.size)}`
      );
    }
  );
};
