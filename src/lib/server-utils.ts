'use server';

import fs from 'fs/promises';
import path from 'path';

export async function getMediaFiles() {
  const mediaDir = path.join(process.cwd(), 'public', 'media');
  try {
    const files = await fs.readdir(mediaDir);
    return files.filter(file => /\.(png|jpg|jpeg|gif|svg)$/.test(file)).map(file => `/media/${file}`);
  } catch (error) {
    console.error('Error reading media directory:', error);
    // If the directory doesn't exist, return an empty array.
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      return [];
    }
    throw error;
  }
}
