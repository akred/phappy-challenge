import React from 'react';
import { render, screen, } from '@testing-library/react';
import CallItem from "./CallItem"

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
test('call item has note / not archived / incoming call', () => {
    render(<CallItem {...call} />);
    //const hasIncomingIcon = screen.getByText('fa-arrow-down');
    //expect(hasIncomingIcon).toBeInTheDocument();
});