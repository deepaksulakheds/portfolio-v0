let cachedPlatform = null;

function detectPlatform() {
  if (cachedPlatform) {
    return cachedPlatform;
  }

  const userAgent = navigator?.userAgent?.toLowerCase() || "";

  if (userAgent.includes("mac")) {
    cachedPlatform = "mac";
  } else if (userAgent.includes("win")) {
    cachedPlatform = "win";
  } else if (userAgent.includes("lin") || userAgent.includes("ubu")) {
    cachedPlatform = "lin";
  } else {
    cachedPlatform = null;
  }
  console.log(cachedPlatform);

  return cachedPlatform;
}

export function useHotkeyAndPlatform() {
  const platform = detectPlatform();

  const getHotkeyStringFromEvent = (e) => {
    if (!e) return null;

    const primaryModifier =
      platform === "mac"
        ? (e.metaKey && "cmd") || (e.ctrlKey && "ctrl")
        : e.ctrlKey && "ctrl";

    return [
      primaryModifier,
      e.altKey && "alt",
      e.shiftKey && "shift",
      e.key.toLowerCase() === " " ? "space" : e.key.toLowerCase(),
    ]
      .filter(Boolean)
      .join("+");
  };

  return { userPlatform: platform, getHotkeyStringFromEvent };
}
