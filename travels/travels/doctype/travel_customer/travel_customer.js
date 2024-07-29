// Copyright (c) 2024, Gatura Njenga and contributors
// For license information, please see license.txt

frappe.ui.form.on("Travel Customer", {
	// refresh(frm) {
    
	// }
    
});

frappe.ui.form.on("Travel Customer", "date_of_birth", function (frm) {
    if (frm.doc.date_of_birth) {
        let today = new Date();
        let birthdate = new Date(frm.doc.date_of_birth);
        if (today < birthdate) {
            frappe.msgprint("Invalid Date of Birth");
            frappe.model.set_value(frm.doctype, frm.docname, "date_of_birth", '');
        }
        else{
            let year_diff = today.getFullYear() - birthdate.getFullYear();
            let month_diff = today.getMonth() - birthdate.getMonth();
            let day_diff = today.getDate() - birthdate.getDate();

            if (month_diff < 0 || (month_diff === 0 && day_diff < 0)) {
                year_diff--;
            }

            let age_str = `${year_diff} years, ${month_diff} months, ${day_diff} days`;
            $(frm.fields_dict['age'].wrapper).html(`${__('AGE')} : ${age_str}`);
        }
    } else {
		$(frm.fields_dict['age'].wrapper).html('');
	}
   
});
