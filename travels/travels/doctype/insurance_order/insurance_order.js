// Copyright (c) 2024, Gatura Njenga and contributors
// For license information, please see license.txt

frappe.ui.form.on("Insurance Order", {
	// refresh(frm) {

	// },
	from_date: function (frm) {
		let fromDate = new Date(frm.doc.from_date);
		let today = new Date();
		if (fromDate < today) {
			frappe.msgprint({
				title:"Warning", 
				message:"From date cannot be before today", 
				indicator:"red"});
			frm.set_value("from_date", "");
			// frm.refresh();
		}

	},

	to_date: function (frm) {
		if (frm.doc.from_date){
			let toDate = new Date(frm.doc.to_date);
			let fromDate = new Date(frm.doc.from_date);
			if (toDate < fromDate) {
				frappe.msgprint("To date cannot be before from date");
				frm.set_value("to_date", "");
			}
		} else {
			frappe.msgprint("Provide from date");
			// frm.set_value("to_date", "");
		}
	},
});
