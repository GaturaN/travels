// Copyright (c) 2024, Gatura Njenga and contributors
// For license information, please see license.txt

frappe.ui.form.on("Insurance Order", {
	refresh(frm) {
		if (!frm.doc.from_date){
			frm.toggle_display("to_date", false);
		} else {
			frm.toggle_display("to_date", true);
		}
	},
	
	from_date: function (frm) {
		let fromDate = new Date(frm.doc.from_date);
		let today = new Date();
		if (fromDate < today) {
			frappe.msgprint({
				title:"Warning", 
				message:"From Date has to be after today", 
				indicator:"red"});
			frm.set_value("from_date", "");
			// frm.refresh();
		}
		if (frm.doc.from_date){
			frm.toggle_display("to_date", true);
		} else {
			frm.toggle_display("to_date", false);
		}

	},

	to_date: function (frm) {
		if (frm.doc.from_date){
			let toDate = new Date(frm.doc.to_date);
			let fromDate = new Date(frm.doc.from_date);
			if (toDate < fromDate) {
				frappe.msgprint({
					title:"Warning", 
					message:"To date has to be after From Date", 
					indicator:"red"});
				frm.set_value("to_date", "");
			}
		} 

		if (frm.doc.from_date && frm.doc.to_date){
			diffInMs = new Date(frm.doc.to_date) - new Date(frm.doc.from_date);
			diffInDays = diffInMs / (1000 * 60 * 60 * 24) + 1;
			frm.set_value("days", diffInDays);
		}
	},

	days: function (frm) {
			// calculate the price
			let price = frm.doc.order_price;
			frm.set_value("amount", price * frm.doc.days);
	},
	
});
