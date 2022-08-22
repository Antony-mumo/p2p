import { defaultPadding, scaleFont } from "./mixins";

// FONT FAMILY
export const FONT_FAMILY_REGULAR = "poppins-medium";
export const FONT_FAMILY_SEMI_BOLD = "poppins-semibold";
export const FONT_FAMILY_BOLD = "poppins-bold";
export const FONT_FAMILY_EXTRA_BOLD = "poppins-extrabold";

// FONT WEIGHT
export const FONT_WEIGHT_REGULAR = "400";
export const FONT_WEIGHT_SEMI_BOLD = "600";
export const FONT_WEIGHT_BOLD = "700";
export const FONT_WEIGHT_EXTRA_BOLD = "800";

// FONT SIZE

export const FONT_SIZE_40 = scaleFont(40);
export const FONT_SIZE_32 = scaleFont(32);
export const FONT_SIZE_24 = scaleFont(24);
export const FONT_SIZE_20 = scaleFont(20);
export const FONT_SIZE_16 = scaleFont(16);
// export const FONT_SIZE_14 = scaleFont(14);
export const FONT_SIZE_12 = scaleFont(12);
// export const FONT_SIZE_10 = scaleFont(10);
export const FONT_SIZE_8 = scaleFont(8);

// LINE HEIGHT
export const LINE_HEIGHT_24 = scaleFont(24);
export const LINE_HEIGHT_20 = scaleFont(20);
export const LINE_HEIGHT_16 = scaleFont(16);

// FONT STYLE
export const FONT_REGULAR = {
  fontFamily: FONT_FAMILY_REGULAR,
  fontWeight: FONT_WEIGHT_REGULAR,
};

export const FONT_BOLD = {
  fontFamily: FONT_FAMILY_BOLD,
  fontWeight: FONT_WEIGHT_SEMI_BOLD,
};

export const FONT_EXTRA_BOLD = {
  fontFamily: FONT_FAMILY_EXTRA_BOLD,
  fontWeight: FONT_WEIGHT_EXTRA_BOLD,
};

export const MAX_WIDTH = 350;

export function defaultSmallText(color, align) {
  let styles = {
    color: color,
    ...FONT_REGULAR,
    fontSize: FONT_SIZE_8,
    textAlign: align,
    ...defaultPadding(),
    display: "flex",
    alignItems: "center",
  };
  return styles;
}

export function defaultMediumSmallText(color, align) {
  let styles = {
    color: color,
    ...FONT_REGULAR,
    fontSize: FONT_SIZE_12,
    textAlign: align,
    ...defaultPadding(),
    display: "flex",
    alignItems: "center",
  };
  return styles;
}

export function defaultText(color, align) {
  let styles = {
    color: color,
    ...FONT_REGULAR,
    fontSize: FONT_SIZE_16,
    textAlign: align,
    ...defaultPadding(),
    display: "flex",
    alignItems: "center",
  };
  return styles;
}

export function defaultMediumLargeText(color, align) {
  let styles = {
    color: color,
    ...FONT_REGULAR,
    fontSize: FONT_SIZE_20,
    textAlign: align,
    ...defaultPadding(),
    display: "flex",
    alignItems: "center",
  };
  return styles;
}

export function defaultLargeText(color, align) {
  let styles = {
    color: color,
    ...FONT_REGULAR,
    fontSize: FONT_SIZE_24,
    textAlign: align,
    ...defaultPadding(),
    display: "flex",
    alignItems: "center",
  };
  return styles;
}

export function smallBoldText(color, align) {
  let styles = {
    color: color,
    ...FONT_BOLD,
    textAlign: align,
    fontSize: FONT_SIZE_8,
    ...defaultPadding(),
    display: "flex",
    alignItems: "center",
  };
  return styles;
}

export function smallMediumBoldText(color, align) {
  let styles = {
    color: color,
    ...FONT_BOLD,
    textAlign: align,
    fontSize: FONT_SIZE_12,
    ...defaultPadding(),
    display: "flex",
    alignItems: "center",
  };
  return styles;
}

export function BoldText(color, align) {
  let styles = {
    color: color,
    ...FONT_BOLD,
    textAlign: align,
    fontSize: FONT_SIZE_16,
    ...defaultPadding(),
    display: "flex",
    alignItems: "center",
  };
  return styles;
}

export function mediumLargeBoldText(color, align) {
  let styles = {
    color: color,
    ...FONT_BOLD,
    textAlign: align,
    fontSize: FONT_SIZE_20,
    ...defaultPadding(),
    display: "flex",
    alignItems: "center",
  };
  return styles;
}

export function largeBoldText(color, align) {
  let styles = {
    color: color,
    ...FONT_BOLD,
    fontSize: FONT_SIZE_24,
    textAlign: align,
    ...defaultPadding(),
    display: "flex",
    alignItems: "center",
  };
  return styles;
}

export function smallExtraBoldText(color, align) {
  let styles = {
    color: color,
    ...FONT_EXTRA_BOLD,
    textAlign: align,
    fontSize: FONT_SIZE_8,
    ...defaultPadding(),
    display: "flex",
    alignItems: "center",
  };
  return styles;
}

export function mediumSmallExtraBoldText(color, align) {
  let styles = {
    color: color,
    ...FONT_EXTRA_BOLD,
    textAlign: align,
    fontSize: FONT_SIZE_12,
    ...defaultPadding(),
    display: "flex",
    alignItems: "center",
  };
  return styles;
}

export function extraBoldText(color, align) {
  let styles = {
    color: color,
    ...FONT_EXTRA_BOLD,
    fontSize: FONT_SIZE_16,
    textAlign: align,
    ...defaultPadding(),
    display: "flex",
    alignItems: "center",
  };
  return styles;
}

export function mediumLargeExtraBoldText(color, align) {
  let styles = {
    color: color,
    ...FONT_EXTRA_BOLD,
    fontSize: FONT_SIZE_20,
    textAlign: align,
    ...defaultPadding(),
    display: "flex",
    alignItems: "center",
  };
  return styles;
}

export function largeExtraBoldText(color, align) {
  let styles = {
    color: color,
    ...FONT_EXTRA_BOLD,
    fontSize: FONT_SIZE_24,
    textAlign: align,
    ...defaultPadding(),
    display: "flex",
    alignItems: "center",
  };
  return styles;
}
