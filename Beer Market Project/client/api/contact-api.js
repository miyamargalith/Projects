import server from "./server";

export function getAllContacts() {
  return server.get("/api/contact/contactUsAll").then(({ data }) => {
    return data;
  });
}

export function createNewContact(contactData) {
  return server.post("/api/contact/contactUs", contactData).then(({ data }) => {
    return data;
  });
}

export function doneWithContact(contactData) {
  return server.post("/api/contact/adminContactUs", contactData).then(({ data }) => {
    return data;
  });
}
