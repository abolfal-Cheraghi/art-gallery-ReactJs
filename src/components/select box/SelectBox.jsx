import React from "react";
import { Field, Select } from "@headlessui/react";
import clsx from "clsx";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

export default function SelectBox({
  onchange,
  bg,
  label,
  children,
  width,
  labelSelcted,
}) {
  return (
    <>
      <div className={`w-[${width}] max-w-md`}>
        <Field>
          <div className="relative">
            <Select
              className={clsx(
                `block w-full appearance-none rounded-lg border-none ${bg} py-2 px-3 text-s-13 text-dark border-box`,
                `focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25`
              )}
              onChange={onchange}
            >
              <option hidden selected={labelSelcted}>
                {label}
              </option>
              {children}
            </Select>
            <MdOutlineKeyboardArrowDown className="group pointer-events-none absolute top-2.5 left-2.5 size-4  fill-dark bg-[#F8F8F8] w-5" />
          </div>
        </Field>
      </div>
    </>
  );
}

SelectBox.defaultProps = {
  bg: "bg-[#F8F8F8]",
  width: "100%",
};
