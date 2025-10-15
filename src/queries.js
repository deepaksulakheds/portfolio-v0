import { gql } from "@apollo/client";

export const SEND_MAIL_QUERY = gql`
  mutation SendMail(
    $name: String!
    $email: String!
    $subject: String!
    $message: String!
    $isSecretAlert: Boolean!
  ) {
    sendMail(
      name: $name
      email: $email
      subject: $subject
      message: $message
      isSecretAlert: $isSecretAlert
    ) {
      status
      message
    }
  }
`;

export const GET_NOTES = gql`
  query GetAllNotes {
    getAllNotes {
      status
      message
      response {
        id
        note
        createdAt
        tag
        isDeleted
        updatedAt
      }
    }
  }
`;

export const ADD_NOTE = gql`
  mutation AddNote($note: String!, $tag: String) {
    addNote(note: $note, tag: $tag) {
      status
      message
    }
  }
`;

export const DELETE_MULTIPLE_NOTES = gql`
  mutation DeleteMultipleNotes($ids: [String!]!) {
    deleteMultipleNotes(ids: $ids) {
      status
      message
    }
  }
`;

export const EDIT_NOTE = gql`
  mutation UpdateNote($id: String!, $note: String!, $tag: String) {
    updateNote(id: $id, note: $note, tag: $tag) {
      status
      message
    }
  }
`;

export const RESTORE_DELETED_NOTES = gql`
  mutation RestoreDeletedNotes($ids: [String!]!) {
    restoreDeletedNotes(ids: $ids) {
      status
      message
    }
  }
`;
