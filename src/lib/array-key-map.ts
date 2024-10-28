import { isEqual } from 'lodash-es';

export class ArrayKeyMap<K extends unknown[], V> extends Map<K, V> {
  override has(key: K): boolean {
    for (const mapKey of this.keys()) {
      if (isEqual(mapKey, key)) {
        return true;
      }
    }

    return false;
  }

  override get(key: K): V | undefined {
    for (const [mapKey, value] of this.entries()) {
      if (isEqual(mapKey, key)) {
        return value;
      }
    }

    return undefined;
  }

  override delete(key: K): boolean {
    for (const mapKey of this.keys()) {
      if (isEqual(mapKey, key)) {
        return super.delete(mapKey);
      }
    }

    return false;
  }
}
