import fs from "fs";
import path from "path";

enum EntryType {
  File,
  Directory,
}

type Entry = {
  type: EntryType;
  name: string;
  size: number;
  entries: Entry[];
  parent?: Entry;
};

const printFolderStructure = (entry: Entry, level: number) => {
  const padding = " ".repeat(level * 2);
  const entryType = entry.type === EntryType.Directory ? "dir" : "file";
  const size = entry.type === EntryType.File ? `, size=${entry.size}` : ``;
  const prompt = `${padding}- ${entry.name} (${entryType}${size})`;

  console.log(prompt);

  entry.entries.forEach((subEntry) =>
    printFolderStructure(subEntry, level + 1)
  );
};

const findDirectorySizesBelowThreshold = (
  root: Entry,
  threshold: number
): number[] => {
  let result = [];

  if (root.size < threshold) {
    result.push(root.size);
  }

  for (let i = 0; i < root.entries.length; i++) {
    const entry = root.entries[i];
    if (entry.type === EntryType.Directory) {
      result = result.concat(
        findDirectorySizesBelowThreshold(entry, threshold)
      );
    }
  }

  return result;
};

const updateDirectorySizes = (root: Entry): Entry => {
  const size =
    root.entries
      .filter((e) => e.type === EntryType.File)
      .map((e) => e.size)
      .reduce((x, y) => x + y, 0) +
    root.entries
      .filter((e) => e.type === EntryType.Directory)
      .map((e) => updateDirectorySizes(e))
      .reduce((x, y) => x + y.size, 0);

  root.size = size;

  return root;
};

const findTheSmallestDirectoryToDelete = (
  entry: Entry,
  toBeDeleted: number,
  minEntrySize: number
): number => {
  let size = minEntrySize;

  if (entry.size > toBeDeleted && entry.size < minEntrySize) {
    size = entry.size;
  }

  const sizes = entry.entries
    .filter((e) => e.type === EntryType.Directory)
    .map((subEntry) =>
      findTheSmallestDirectoryToDelete(subEntry, toBeDeleted, size)
    );

  const result = sizes.length > 0 ? Math.min.apply(null, sizes) : size;

  return result;
};

export const problem1 = () => {
  const input = fs.readFileSync(path.join(__dirname, "./input.txt")).toString();

  const root: Entry = {
    type: EntryType.Directory,
    name: "/",
    size: 0,
    entries: [],
  };
  let cursor = root;

  const history: string[] = [];
  let currentDirectory = "/";

  const lines = input.split("\n").slice(1);

  for (const line of lines) {
    if (line.startsWith("$")) {
      if (line.startsWith("$ cd")) {
        const dir = line.substring(5);

        if (dir === "..") {
          currentDirectory = history.pop() as string;
          cursor = cursor.parent as Entry;
        } else {
          currentDirectory = dir;
          history.push(currentDirectory);
          cursor = cursor.entries.find(
            (entry) => entry.name === currentDirectory
          ) as Entry;
        }
      }

      if (line.startsWith("$ ls")) {
        // do nothing
      }

      continue;
    }

    if (line.startsWith("dir")) {
      const dir: Entry = {
        type: EntryType.Directory,
        name: line.substring(4),
        size: 0,
        entries: [],
        parent: cursor,
      };

      cursor.entries.push(dir);

      continue;
    }

    // process files
    const fileEntries = line.split(" ");
    const file: Entry = {
      type: EntryType.File,
      name: fileEntries[1],
      size: Number(fileEntries[0]),
      entries: [],
      parent: cursor,
    };

    cursor.entries.push(file);
  }

  updateDirectorySizes(root);

  return findDirectorySizesBelowThreshold(root, 100000).reduce(
    (x, y) => x + y,
    0
  );
};

export const problem2 = () => {
  const input = fs.readFileSync(path.join(__dirname, "./input.txt")).toString();

  const root: Entry = {
    type: EntryType.Directory,
    name: "/",
    size: 0,
    entries: [],
  };
  let cursor = root;

  const history: string[] = [];
  let currentDirectory = "/";

  const lines = input.split("\n").slice(1);

  for (const line of lines) {
    if (line.startsWith("$")) {
      if (line.startsWith("$ cd")) {
        const dir = line.substring(5);

        if (dir === "..") {
          currentDirectory = history.pop() as string;
          cursor = cursor.parent as Entry;
        } else {
          currentDirectory = dir;
          history.push(currentDirectory);
          cursor = cursor.entries.find(
            (entry) => entry.name === currentDirectory
          ) as Entry;
        }
      }

      if (line.startsWith("$ ls")) {
        // do nothing
      }

      continue;
    }

    if (line.startsWith("dir")) {
      const dir: Entry = {
        type: EntryType.Directory,
        name: line.substring(4),
        size: 0,
        entries: [],
        parent: cursor,
      };

      cursor.entries.push(dir);

      continue;
    }

    // process files
    const fileEntries = line.split(" ");
    const file: Entry = {
      type: EntryType.File,
      name: fileEntries[1],
      size: Number(fileEntries[0]),
      entries: [],
      parent: cursor,
    };

    cursor.entries.push(file);
  }

  updateDirectorySizes(root);

  const fileSystemSize = 70000000;
  const updateRequiredSize = 30000000;
  const currentFreeSpace = fileSystemSize - root.size;
  const toBeDeleted = updateRequiredSize - currentFreeSpace;

  return findTheSmallestDirectoryToDelete(root, toBeDeleted, root.size);
};
