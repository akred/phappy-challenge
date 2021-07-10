/**
 * We can use Type instead of Interface
 * From what I read in documentation, The only extra feature Interfaces bring to the table (that Type aliases don’t),
 * is “declaration merging” which means you can define the same interface several times and with each definition, the properties get merged
 */
interface INote {
  id: !ID; // "unique ID of the note"
  content: !String; // content of the note
}

interface NoteProps {
  note: INote;
}

type ApiDataType = {
  message: string;
  status: string;
  notes: INote[];
  note?: INote;
};
