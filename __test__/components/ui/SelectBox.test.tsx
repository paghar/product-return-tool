import renderer from "react-test-renderer";
import SelectBox from "../../../src/components/ui/selectBox/SelectBox";

describe(">>>> SelectBox", () => {
    test("++++ Snapshot SelectBox", () => {
        const component = renderer.create(
            <SelectBox
                id="Radio1"
                items={[]}
                selectedValue=""
                onChange={jest.fn()}                
            />             
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});

export {};