const memoryStore = globalThis.__digitalLifterzStore || new Map();
globalThis.__digitalLifterzStore = memoryStore;

const kvUrl = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const kvToken =
  process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

async function kvCommand(command) {
  if (!kvUrl || !kvToken) return null;

  const response = await fetch(kvUrl, {
    method: "POST",
    headers: {
      authorization: `Bearer ${kvToken}`,
      "content-type": "application/json",
    },
    body: JSON.stringify(command),
  });

  if (!response.ok) {
    throw new Error(`KV command failed with status ${response.status}.`);
  }

  const data = await response.json();
  return data.result;
}

export async function getValue(key) {
  const result = await kvCommand(["GET", key]);
  if (result !== null) {
    if (typeof result === "string") {
      try {
        return JSON.parse(result);
      } catch {
        return result;
      }
    }

    return result;
  }

  return memoryStore.get(key) ?? null;
}

export async function setValue(key, value) {
  const serialized = JSON.stringify(value);
  const result = await kvCommand(["SET", key, serialized]);

  if (result === null) {
    memoryStore.set(key, value);
  }
}

export async function incrementWithExpiry(key, seconds) {
  const result = await kvCommand(["INCR", key]);

  if (result !== null) {
    if (Number(result) === 1) {
      await kvCommand(["EXPIRE", key, seconds]);
    }

    return Number(result);
  }

  const now = Date.now();
  const current = memoryStore.get(key);

  if (!current || current.expiresAt <= now) {
    memoryStore.set(key, { count: 1, expiresAt: now + seconds * 1000 });
    return 1;
  }

  current.count += 1;
  memoryStore.set(key, current);
  return current.count;
}

export async function deleteValue(key) {
  const result = await kvCommand(["DEL", key]);

  if (result === null) {
    memoryStore.delete(key);
  }
}
