import { LeggoForm } from "../engine/index";
import "antd/dist/antd.css";

export function Pages(props: any) {
  const content = LeggoForm.useLeggo(props.config);

  return <LeggoForm leggo={content} />;
}

export default Pages;
