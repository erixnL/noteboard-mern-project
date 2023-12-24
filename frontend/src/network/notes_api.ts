import { Note } from "../models/notes";

//extend the fetch function to handle error condition
async function fetchData(input: RequestInfo, init?: RequestInit) {
    const response = await fetch(input, init);
    if (response.ok){
        return response;
    } else {
        const errorBody = await response.json();
        const errorMessage = errorBody.error;
        throw Error(errorMessage);
    }
}

//async function return a promise
export async function fetchNotes(): Promise<Note[]> {
    const response = await fetchData("/api/notes", {method: "GET"});
    return response.json();
}

export interface NoteInput {
    title: string,
    text?: string,
}

//send new note to backend database
export async function createNote(note: NoteInput): Promise<Note> {
    const response = await fetchData("/api/notes",
    {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(note),
    });
    return response.json();
}

//delete note function
export async function deleteNote(noteId: string) {
    await fetchData("/api/notes/" + noteId, {method: "DELETE"});

}