import { shallow } from "enzyme";
import CallItem from "./CallItem";
import DetailButton from "./action-buttons/DetailButton";
import ArchiveButton from "./action-buttons/ArchiveButton";

const note = {
  id: "1",
  content: "Secret message",
};
const call = {
  id: "ddf97c38-bb70-4a9e-ae19-20c72b9b4d05",
  duration: 41898,
  is_archived: false,
  from: "+33156965939",
  to: "+33108356808",
  direction: "inbound",
  call_type: "answered",
  via: "+33188833258",
  created_at: "2021-07-06T00:56:47.098Z",
  notes: [note],
};
const mockCallback = jest.fn();
describe("<CallItem />", () => {
  it("renders actions buttons", () => {
    const wrapper = shallow(
      <CallItem call={call} parentCallback={mockCallback} />
    );
    expect(wrapper.find(DetailButton).length).toEqual(1);
    expect(wrapper.find(ArchiveButton).length).toEqual(1);
  });
});