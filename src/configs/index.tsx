import React, { useRef, useState } from "react";
import { TConfigsContextValue, TOnGetSchemaModel, TSchema } from "../interface";
import { registerItemStore } from "../utils/registerItemStore";
import LowCodeLeft from "./LowCodeLeft";
import LowCodeMiddle from "./LowCodeMiddle";
import LowCodeRight from "./LowCodeRight";

export const ConfigsContext = React.createContext<TConfigsContextValue>(null);

export function LeggoConfigs(
  props: React.PropsWithChildren<{
    onGetSchemaModel: TOnGetSchemaModel;
  }>
) {
  const { onGetSchemaModel } = props;
  const activeSchema = useRef<TSchema>(null);
  const [schemaList, setSchemaList] = useState<TSchema[]>([]);
  const setForceRender = useState(0)[1];
  const contextValue: TConfigsContextValue = {
    activeSchema,
    schemaList,
    schemaListOptions: [],
    setSchemaList,
    onGetSchemaModel,
    forceRender: () => setForceRender((pre) => pre + 1),
  };

  return (
    <ConfigsContext.Provider value={contextValue}>
      <div className="leggo-configs">
        <LowCodeLeft />
        <LowCodeMiddle />
        <LowCodeRight />
      </div>
    </ConfigsContext.Provider>
  );
}

LeggoConfigs.registerItemStore = registerItemStore;
