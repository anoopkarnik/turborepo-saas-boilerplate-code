import MdxAlert from "./Alert";
import MdxBadge from "./Badge";
import blockquote from "./blockquote";
import code from "./code";
import h1 from "./h1";
import h2 from "./h2";
import h3 from "./h3";
import MdxSeparator from "./hr";
import Li from "./li";
import Ol from "./ol";
import Ul from "./ul";

export const components:any = {
  h1: h1,
  h2: h2,
  h3: h3,
  blockquote: blockquote,
  Alert: MdxAlert,
  Badge: MdxBadge,
  hr: MdxSeparator,
  code: code,
  ul: Ul,
  ol: Ol,
  li: Li,
};