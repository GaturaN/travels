// Copyright (c) 2024, Gatura Njenga and contributors
// For license information, please see license.txt

// frappe.ui.form.on("Insurance Order", {
// 	refresh(frm) {

// 	},
// });

frappe.ui.form.on("Insurance Order", "from_date", function (frm) {
  let from_date = new Date(frm.doc.from_date);
  let to_date = new Date(frm.doc.to_date);
  let today = new Date();

  // if from_date is less than today
  if (from_date < today) {
    frappe.msgprint("Invalid From Date");
    frappe.model.set_value(frm.doctype, frm.docname, "from_date", "");
  }
});

// check to_date

  