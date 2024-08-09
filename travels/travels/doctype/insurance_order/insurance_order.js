// Copyright (c) 2024, Gatura Njenga and contributors
// For license information, please see license.txt

frappe.ui.form.on("Insurance Order", {
	// refresh(frm) {

	// },
	from_date: function (frm) {
		let fromDate = new Date(frm.doc.from_date);
		let today = new Date();
		if (fromDate < today) {
			frappe.throw("From date cannot be before today");
			frm.set_value("from_date", "");
		}

	}
});
