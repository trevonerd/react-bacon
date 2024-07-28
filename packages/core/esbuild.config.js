import * as esbuild from 'esbuild';
import { exec } from 'child_process';
import { promisify } from 'util';
import path from 'path';

const execPromise = promisify(exec);
const tscPath = path.join('node_modules', '.bin', 'tsc');

console.log('🚀 Starting build process...\n');

try {
  console.log('🧬 Starting esbuild...\n');

  await esbuild.build({
    entryPoints: ['src/index.ts'],
    bundle: true,
    outfile: 'dist/index.js',
    format: 'esm',
    platform: 'node',
    target: 'node18',
    external: [],
    logLevel: 'info',
  });

  console.log('🎉 Esbuild completed successfully!\n');

  console.log('🦄 Starting TypeScript compilation...');

  await execPromise(tscPath);

  console.log('✨ TypeScript compilation completed successfully!\n');

  console.log('✅ Build completed successfully!');
} catch (error) {
  console.error('❌ Build failed!');
  console.error('Error details:', error);
}
