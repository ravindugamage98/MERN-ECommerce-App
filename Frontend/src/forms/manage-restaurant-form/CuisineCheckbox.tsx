import { Checkbox } from "@/components/ui/checkbox";
import { FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { ControllerRenderProps, FieldValues } from "react-hook-form";

type Props = {
  cuisine: string;
  field: ControllerRenderProps<FieldValues, "cuisines">;
};

const CuisineCheckbox = ({ cuisine, field }: Props) => {
  return (
    <FormItem className="flex flex-row items-center space-x-1 space-y-0 mt-2 ">
      <FormControl>
        <Checkbox
          className="bg-white"
          //* field.value = list of cuisines user has selected
          checked={field.value.includes(cuisine)}
          onCheckedChange={(checked) => {
            // If the checkbox is checked, add the cuisine to the list of cuisines
            if (checked) {
              field.onChange([...field.value, cuisine]);
            } else {
              // If the checkbox is unchecked, remove the cuisine from the list of cuisines
              field.onChange(
                field.value.filter((value: string) => value !== cuisine)
              );
            }
          }}
        />
      </FormControl>
      <FormLabel className="text-sm font-normal">{cuisine}</FormLabel>
    </FormItem>
  );
};

export default CuisineCheckbox;
