// Copyright (c) 2024, Gatura Njenga and contributors
// For license information, please see license.txt

frappe.ui.form.on("Traveller", {
	date_of_birth: function(frm) {
        let today = new Date();
        let birthdate = new Date(frm.doc.date_of_birth);
        let ageYears = today.getFullYear() - birthdate.getFullYear();
        let ageMonths = today.getMonth() - birthdate.getMonth();
        let ageDays = today.getDate() - birthdate.getDate();

        if (ageMonths < 0 || (ageMonths === 0 && ageDays < 0)) {
            ageYears--;
            ageMonths += 12;
        }
        if (ageDays < 0) {
            ageMonths--;
            ageDays += new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
        }

        frm.set_value("age", `${ageYears} years ${ageMonths} months ${ageDays} days`);
	},
});
