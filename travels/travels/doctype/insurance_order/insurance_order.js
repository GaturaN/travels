// Copyright (c) 2024, Gatura Njenga and contributors
// For license information, please see license.txt

frappe.ui.form.on("Insurance Order", {
  refresh(frm) {
    if (!frm.doc.from_date) {
      frm.toggle_display("to_date", false);
    } else {
      frm.toggle_display("to_date", true);
    }
    if (frm.doc.category === "Individual") {
      frm.toggle_display("beneficiaries", false);
    } else {
      frm.toggle_display("beneficiaries", true);
    }
  },

  from_date : function (frm) {
    let fromDate = new Date(frm.doc.from_date);
    let today = new Date();
    if (fromDate < today) {
      frappe.msgprint({
        title: "Warning",
        message: "From Date has to be after today",
        indicator: "red",
      });
      frm.set_value("from_date", "");
      // frm.refresh();
    }
    if (frm.doc.from_date) {
      frm.toggle_display("to_date", true);
    } else {
      frm.toggle_display("to_date", false);
    }
  },

  to_date: function (frm) {
    if (frm.doc.from_date) {
      let toDate = new Date(frm.doc.to_date);
      let fromDate = new Date(frm.doc.from_date);
      if (toDate < fromDate) {
        frappe.msgprint({
          title: "Warning",
          message: "To date has to be after From Date",
          indicator: "red",
        });
        frm.set_value("to_date", "");
      }
    }

    if (frm.doc.from_date && frm.doc.to_date) {
      diffInMs = new Date(frm.doc.to_date) - new Date(frm.doc.from_date);
      diffInDays = diffInMs / (1000 * 60 * 60 * 24) + 1;
      frm.set_value("days", diffInDays);
    }
  },

  days: function (frm) {
    if (frm.doc.days) {
      let price = frm.doc.order_price;
      let days = frm.doc.days;
      frm.set_value("amount", price * days);
    }
  },

  category: function (frm) {
    if (frm.doc.category === "Individual") {
      // clear the beneficiary section
      frm.clear_table("beneficiaries");
      frm.toggle_display("beneficiaries", false);
    } else {
      frm.toggle_display("beneficiaries", true);
    }

    // if category is != individuals, set the beneficiaries as mandatory
    if (frm.doc.category !== "Individual") {
      frm.set_df_property("beneficiaries", "reqd", 1);
    } else {
      frm.set_df_property("beneficiaries", "reqd", 0);
    }
  },
});

// beneficiaries childtable -> if beneficiary is added or removed in the table.
// beneficiary should not be the main insured customer in the form
// Beneficiaries should not be the same
// calculate amount based on number of beneficiaries

frappe.ui.form.on("Insurance Beneficiaries", {
  beneficiaries_add: function (frm, cdt, cdn) {
    console.log(frm);
    console.log(cdt);
    console.log(cdn);
    frappe.show_alert("Beneficiary added");
  },
  full_name(frm) {
    console.log("Full Name changed");
  },
  // beneficiaries_add(frm, cdt, cdn){
  // 	frappe.msgprint("Beneficiary added");
  // }
});
