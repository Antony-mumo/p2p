import { Dimensions, PixelRatio, Platform } from "react-native";

export const isIOS = Platform.OS === "ios";
export const isAndroid = Platform.OS === "android";

const WINDOW_WIDTH = Dimensions.get("window").width;
export const WINDOW_HEIGHT = Dimensions.get("window").height;
const guidelineBaseWidth = 375;

export const scaleSize = (size) => (WINDOW_WIDTH / guidelineBaseWidth) * size;

export const scaleFont = (size) => size * PixelRatio.getFontScale();

function dimensions(top, right = top, bottom = top, left = right, property) {
  let styles = {};

  styles[`${property}Top`] = top;
  styles[`${property}Right`] = right;
  styles[`${property}Bottom`] = bottom;
  styles[`${property}Left`] = left;

  return styles;
}

export function margin(top, right, bottom, left) {
  return dimensions(top, right, bottom, left, "margin");
}

export function defaultMargin() {
  return dimensions(3, 10, 3, 10, "margin");
}

export function padding(top, right, bottom, left) {
  return dimensions(top, right, bottom, left, "padding");
}

export function defaultPadding() {
  return dimensions(3, 3, 3, 3, "padding");
}

export function boxShadow(
  color,
  offset = { height: 2, width: 2 },
  radius = 8,
  opacity = 0.2
) {
  return {
    shadowColor: color,
    shadowOffset: offset,
    shadowOpacity: opacity,
    shadowRadius: radius,
    elevation: radius,
  };
}

export function border(
  topLeft,
  topRight,
  bottomLeft,
  bottomRight,
  width,
  color
) {
  let styles = {
    borderColor: color,
    borderTopLeftRadius: topLeft,
    borderTopRightRadius: topRight,
    borderBottomLeftRadius: bottomLeft,
    borderBottomRightRadius: bottomRight,
    borderWidth: width,
  };
  return styles;
}

export function elevationShadowStyle(elevation) {
  return {
    elevation,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0.5 * elevation },
    shadowOpacity: 0.5,
    shadowRadius: 0.8 * elevation,
    borderWidth: 0.1,
  };
}

export function row(align) {
  return {
    flexDirection: "row",
    alignItems: align,
  };
}
