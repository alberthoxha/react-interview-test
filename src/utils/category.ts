export function categoryTitleFormat(category: string | string[]) {
  if (Array.isArray(category)) {
    category.map((item) => {
      if (item === "side_walk_sheed") return "Side Walk Sheed";
      if (item === "scaffold") return "Scaffold";
      if (item === "shoring") return "Shoring";
    });
  } else {
    if (category === "side_walk_sheed") return "Side Walk Sheed";
    if (category === "scaffold") return "Scaffold";
    if (category === "shoring") return "Shoring";
  }
}

export function colorByCategory(category: string | string[]) {
  if (Array.isArray(category)) {
    category.map((item) => {
      if (item === "side_walk_sheed") return "side-walk-sheed-color";
      if (item === "scaffold") return "scaffold-color";
      if (item === "shoring") return "shoring-color";
    });
  } else {
    if (category === "side_walk_sheed") return "side-walk-sheed-color";
    if (category === "scaffold") return "scaffold-color";
    if (category === "shoring") return "shoring-color";
  }
}
