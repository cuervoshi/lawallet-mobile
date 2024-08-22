import React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

interface HiddenIconProps extends SvgProps {
  color?: string; // Propiedad adicional para el color
}

export function HiddenIcon({
  color = "currentColor",
  ...props
}: HiddenIconProps) {
  return (
    <Svg
      viewBox="0 0 24 24"
      {...props} // Desestructuración de otras props
    >
      <Path
        d="M14.33 7.17C13.588 7.058 12.807 7 12 7c-4.97 0-9 2.239-9 5 0 1.44 1.096 2.738 2.85 3.65l2.362-2.362a4 4 0 015.076-5.076l1.043-1.043zM11.23 15.926a4 4 0 004.695-4.695l2.648-2.647C20.078 9.478 21 10.68 21 12c0 2.761-4.03 5-9 5-.598 0-1.183-.032-1.749-.094l.98-.98zM17.793 5.207a1 1 0 111.414 1.414L6.48 19.35a1 1 0 11-1.414-1.414L17.793 5.207z"
        fill={color} // Aquí aplicamos el color usando la propiedad `fill` nativa
      />
    </Svg>
  );
}
