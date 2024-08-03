(() => {
    // nobody else needs these functions so they are not in window.app
    document.addEventListener('DOMContentLoaded', () => {
        const printButton = document.getElementById('print-print');
        const reportTypeSelect = document.getElementById('print-report-type');

        reportTypeSelect.addEventListener('change', () => {
            const reportType = reportTypeSelect.value;
            document.getElementById('print-students-options').style.display = reportType === 'students' ? 'block' : 'none';
            document.getElementById('print-vouchers-options').style.display = reportType === 'vouchers' ? 'block' : 'none';
            document.getElementById('print-balance-options').style.display = reportType === 'balance' ? 'block' : 'none';
        });

        printButton.addEventListener('click', () => {
            const reportType = reportTypeSelect.value;

            if (reportType === 'students') {
                const schoolYear = document.getElementById('print-year').value;
                const section = document.getElementById('print-section').value;
                const gradeLevel = document.getElementById('print-grade').value;
                const transactions = filterTransactions(schoolYear, section, gradeLevel);
                console.log(transactions);
                const formattedData = formatData(transactions, reportType);
                generatePDF(formattedData);
            } else if (reportType === 'vouchers') {
                const fromDate = document.getElementById('print-vouchers-from-date').value;
                const toDate = document.getElementById('print-vouchers-to-date').value;
                const vouchers = filterVouchers(fromDate, toDate);
                const formattedData = formatData(vouchers, reportType);
                generatePDF(formattedData);
            } else if (reportType === 'balance') {
                const fromDate = document.getElementById('print-balance-from-date').value;
                const toDate = document.getElementById('print-balance-to-date').value;
                const balanceTransactions = filterBalanceTransactions(fromDate, toDate);
                const formattedData = formatData(balanceTransactions, reportType);
                generatePDF(formattedData);
            }
        });
    });

    function filterTransactions(schoolYear, section, gradeLevel) {
        return window.app.payments.filter(payment => {
            const parent = window.app.parents.find(parent => String(parent.id) == payment.parentID) || { id: -1 };

            let student = window.app.students.find(student => student.parentID == String(parent.id));

	    student = window.app.students.find(sudent => String(student.id) == payment.studentID || student.parentID == payment.parentID) || student;
            if(!student) return false;

 	    let sectionObj = window.app.sections.find(s => s.class.toLowerCase() == section.toLowerCase());

            const matches = schoolYear &&
                (!section || student.sectionID == String(sectionObj?.id)) &&
                (!gradeLevel || student.gradeID === gradeLevel);

            console.log(`Payment ID: ${payment.id}, Matches: ${matches}`);
            return matches;
        });
    }

    function filterVouchers(fromDate, toDate) {
	// const moment = new require('moment');
        const fromTimestamp = new Date(fromDate).toISOString().slice(0, 10).replace('T', '');
	console.log('from:', fromTimestamp);
        const toTimestamp = new Date(toDate).toISOString().slice(0, 10).replace('T', '');
        console.log('to' + toTimestamp)
	
	return window.app.vouchers.filter(voucher => {
	   const voucherDateFilter = new Date(voucher.timestamp).toISOString().slice(0, 10);
	   return voucherDateFilter >= fromTimestamp && voucherDateFilter <= toTimestamp;
        });
    }

    function filterBalanceTransactions(fromDate, toDate) {
        const fromTimestamp = new Date(fromDate).toISOString().slice(0, 10).replace('T', '');
        const toTimestamp = new Date(toDate).toISOString().slice(0, 10).replace('T', '')
        return window.app.transactions.filter(transaction => {
	    const transactionDateFilter = new Date(voucher.timestamp).toISOString().slice(0, 10);
            return transactionDateFilter >= fromTimestamp && transactionDateFilter <= toTimestamp;
        });
    }

    function formatData(data, reportType) {
        if (reportType === 'students') {
            console.log(data);
            return data.map(transaction => {
                let student;
                let parent;
                console.log(transaction); // 1
                if (transaction.studentID != null && transaction.studentID != "-1") {
                    student = window.app.students.find(student => String(student.id) == transaction.studentID);
                } else {
                    parent = window.app.parents.find(parent => String(parent.id) == transaction.parentID);
                    student = window.app.students.find(student => student.parentID == String(parent.id));
                }

              

                if (!student) {
                    console.log("Student not found");
                    return {
                        name: 'Unknown',
                        gradeLevel: 'Unknown',
                        section: 'Unknown',
                        amountPaid: transaction.amount
                    };
                }

                console.log(student); // 2

                return {
                    name: student.name,
                    gradeLevel: student.gradeID,
                    section: student.sectionID,
                    amountPaid: transaction.amount,
                    year: transaction.year
                };
            });
        } else if (reportType === 'vouchers') {
            return data.map(voucher => {
                return {
                    voucherNumber: String(voucher.id),
                    amount: voucher.amount,
                    date: voucher.timestamp,
		    name: voucher.name
                };
            });
        } else if (reportType === 'balance') {
            var thisBalance = 0;
            return data.map(transaction => {
                thisBalance += Number(transaction.amount);
                return {
                    date: transaction.timestamp,
                    amount: transaction.amount,
                    balance: thisBalance,
                    parentID: transaction.parentID
                };
            });
        }
    }

    function generatePDF(data) {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF('p', 'mm', 'letter');

        const reportType = document.getElementById('print-report-type').value;

        doc.setFontSize(22);
        doc.text('Tagum City National High School', 105, 20, { align: 'center' });
        doc.setFontSize(16);
        doc.text('School Parents Teacher Association', 105, 30, { align: 'center' });
        doc.text(`${reportType.charAt(0).toUpperCase() + reportType.slice(1)} Report`, 105, 40, { align: 'center' });

        doc.setFontSize(10);
        let yPosition = 60;

        if (reportType === 'students') {
            doc.text('NAME', 10, yPosition);
            doc.text('GRADE LEVEL', 60, yPosition);
            doc.text('SECTION', 100, yPosition);
            doc.text('AMOUNT PAID', 140, yPosition);
            doc.text('YEAR', 180, yPosition);

            yPosition += 10;

         data.forEach(item => {
            doc.text(item.name, 10, yPosition);
            doc.text(item.gradeLevel, 60, yPosition);
            doc.text(item.section, 100, yPosition);
            doc.text('P'+ item.amountPaid, 140, yPosition);
            doc.text(item.year, 180, yPosition);
            
            yPosition += 10;
            });
        } else if (reportType === 'vouchers') {
            doc.text('VOUCHER #', 10, yPosition);
            doc.text('AMOUNT', 60, yPosition);
            doc.text('DATE', 100, yPosition);
	         doc.text('ALLOCATION', 160, yPosition)
            yPosition += 10;

            data.forEach(item => {
                doc.text(item.voucherNumber.toString().padStart(7, '0'), 10, yPosition);
                doc.text('P' + item.amount, 60, yPosition);
                doc.text(window.app.formatTimestamp(item.date), 100, yPosition);
		doc.text(item.name, 160, yPosition);
                yPosition += 10
    });
        } else if (reportType === 'balance') {
            doc.text('DATE', 10, yPosition);
            doc.text('AMOUNT', 60, yPosition);
            doc.text('BALANCE', 110, yPosition);
            doc.text('PARENT', 160, yPosition);

            yPosition += 10;

            data.forEach(item => {
                doc.text(window.app.formatTimestamp(item.date), 10, yPosition);
                doc.text('P' + item.amount, 60, yPosition);
                doc.text('P' + String(item.balance), 110, yPosition);
                doc.text(window.app.parentIDToName(Number(item.parentID)), 160, yPosition);
                yPosition += 10;
            });
        }

        const time = window.app.getDate();
        doc.setFontSize(8);
        doc.text(`Generated On: ${time} | Generated By ${window.app.user.name}`, 8, yPosition + 10);
        // doc.text(te
        doc.save('Transactions - ' + time + '.pdf');
    }
})();
