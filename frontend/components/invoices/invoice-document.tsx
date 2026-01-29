/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import { Page, Text, View, Document, StyleSheet, Font } from '@react-pdf/renderer';
import { Invoice } from '@/lib/types';

const styles = StyleSheet.create({
    page: {
        padding: 30,
        fontFamily: 'Helvetica',
        fontSize: 10,
        color: '#333',
    },
    // Header Section
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#000',
        paddingBottom: 10,
    },
    headerLeft: {
        flexDirection: 'column',
    },
    companyName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    companyAddress: {
        fontSize: 9,
        color: '#666',
        marginBottom: 1,
    },
    invoiceTitle: {
        fontSize: 28,
        color: '#1e3a8a', // Dark blue (Tailwind blue-900 approx)
        fontWeight: 'bold',
        alignSelf: 'flex-end',
    },

    // Info Grid (Invoice #, Date, etc)
    infoGrid: {
        flexDirection: 'row',
        marginBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#000',
    },
    infoColumn: {
        width: '50%',
        paddingVertical: 10,
    },
    infoRow: {
        flexDirection: 'row',
        marginBottom: 4,
    },
    infoLabel: {
        width: 80,
        color: '#666',
    },
    infoValue: {
        fontWeight: 'bold',
    },

    // Bill To / Ship To
    addressSection: {
        flexDirection: 'row',
        marginBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#000',
    },
    addressCol: {
        width: '50%',
        borderRightWidth: 1,
        borderColor: '#000',
    },
    addressColRight: {
        width: '50%',
    },
    sectionHeader: {
        backgroundColor: '#f3f4f6', // Light gray
        padding: 5,
        fontWeight: 'bold',
        borderBottomWidth: 1,
        borderColor: '#000',
    },
    addressContent: {
        padding: 10,
    },
    customerName: {
        fontWeight: 'bold',
        marginBottom: 2,
    },

    // Table
    table: {
        width: '100%',
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#000',
    },
    tableHeader: {
        flexDirection: 'row',
        backgroundColor: '#1e3a8a', // Dark blue
        color: '#fff',
        height: 24,
        alignItems: 'center',
    },
    tableHeaderCell: {
        paddingHorizontal: 8,
        fontWeight: 'bold',
        borderRightWidth: 1,
        borderColor: '#fff', // White separators in header
        height: '100%',
        justifyContent: 'center',
    },
    tableRow: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: '#000',
        minHeight: 24,
        alignItems: 'center',
    },
    tableCell: {
        padding: 8,
        borderRightWidth: 1,
        borderColor: '#000',
        height: '100%',
    },
    // Column Widths
    colId: { width: '8%', textAlign: 'center' },
    colDesc: { width: '47%' },
    colQty: { width: '15%', textAlign: 'center' },
    colRate: { width: '15%', textAlign: 'right' },
    colAmount: { width: '15%', textAlign: 'right', borderRightWidth: 0 },

    // Footer Section
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    footerLeft: {
        width: '60%',
        paddingRight: 20,
    },
    footerRight: {
        width: '35%',
    },
    thankYou: {
        marginTop: 20,
        marginBottom: 10,
        color: '#666',
        fontStyle: 'italic',
    },
    termsTitle: {
        fontWeight: 'bold',
        marginBottom: 4,
        textDecoration: 'underline',
    },
    termsText: {
        fontSize: 8,
        color: '#666',
        lineHeight: 1.4,
    },

    // Totals Box
    totalBox: {
        borderWidth: 1,
        borderColor: '#000',
    },
    totalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 8,
        backgroundColor: '#bfdbfe', // Light blue background for whole box in image? No, image has white then blue bottom.
        // Let's match image: Tax and Total in white/light, Balance in Blue
    },
    totalRowBlue: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 8,
        backgroundColor: '#bfdbfe', // Image shows a blue block for the totals
        borderTopWidth: 1,
        borderColor: '#000',
    },
    totalLabel: {
        fontWeight: 'bold',
    },
    totalValue: {
        fontWeight: 'bold',
    },
    balanceRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 8,
        backgroundColor: '#bfdbfe', // Lighter blue
        borderTopWidth: 1,
        borderColor: '#000',
    },
});

const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(amount);
};

// Mock data for fields missing in API
const MOCK_DATE = "05 Aug 2024";
const MOCK_DUE_DATE = "05 Aug 2024";
const MOCK_TERMS = "Due on Receipt";
const MOCK_CUSTOMER = {
    name: "Ms. Mary D. Dunton",
    address1: "1324 Hinkle Lake Road",
    address2: "Needham",
    address3: "02192 Maine",
};

interface InvoiceDocumentProps {
    invoice?: Invoice;
}

const InvoiceDocument = ({ invoice }: InvoiceDocumentProps) => {
    // Fallback if no invoice provided (shouldn't happen in normal flow, but good for preview)
    if (!invoice) return <Document><Page><Text>No invoice data</Text></Page></Document>;

    return (
        <Document>
            <Page size="A4" style={styles.page}>

                {/* HEADER */}
                <View style={styles.header}>
                    <View style={styles.headerLeft}>
                        <Text style={styles.companyName}>Zylker Electronics Hub</Text>
                        <Text style={styles.companyAddress}>14B, Northern Street</Text>
                        <Text style={styles.companyAddress}>Greater South Avenue</Text>
                        <Text style={styles.companyAddress}>New York New York 10001</Text>
                        <Text style={styles.companyAddress}>U.S.A</Text>
                    </View>
                    <Text style={styles.invoiceTitle}>INVOICE</Text>
                </View>

                {/* INFO GRID */}
                <View style={styles.infoGrid}>
                    <View style={[styles.infoColumn, { borderRightWidth: 1, borderColor: '#000', paddingRight: 10 }]}>
                        <View style={styles.infoRow}>
                            <Text style={styles.infoLabel}>Invoice#</Text>
                            <Text style={styles.infoValue}>{invoice.invoice_number}</Text>
                        </View>
                        <View style={styles.infoRow}>
                            <Text style={styles.infoLabel}>Invoice Date</Text>
                            <Text style={styles.infoValue}>{MOCK_DATE}</Text>
                        </View>
                        <View style={styles.infoRow}>
                            <Text style={styles.infoLabel}>Terms</Text>
                            <Text style={styles.infoValue}>{MOCK_TERMS}</Text>
                        </View>
                        <View style={styles.infoRow}>
                            <Text style={styles.infoLabel}>Due Date</Text>
                            <Text style={styles.infoValue}>{MOCK_DUE_DATE}</Text>
                        </View>
                    </View>
                    <View style={styles.infoColumn} />
                </View>

                {/* ADDRESS SECTION */}
                <View style={styles.addressSection}>
                    <View style={styles.addressCol}>
                        <Text style={styles.sectionHeader}>Bill To</Text>
                        <View style={styles.addressContent}>
                            <Text style={styles.customerName}>{MOCK_CUSTOMER.name}</Text>
                            <Text style={styles.companyAddress}>{MOCK_CUSTOMER.address1}</Text>
                            <Text style={styles.companyAddress}>{MOCK_CUSTOMER.address2}</Text>
                            <Text style={styles.companyAddress}>{MOCK_CUSTOMER.address3}</Text>
                        </View>
                    </View>
                    <View style={styles.addressColRight}>
                        <Text style={styles.sectionHeader}>Ship To</Text>
                        <View style={styles.addressContent}>
                            <Text style={styles.companyAddress}>{MOCK_CUSTOMER.address1}</Text>
                            <Text style={styles.companyAddress}>{MOCK_CUSTOMER.address2}</Text>
                            <Text style={styles.companyAddress}>{MOCK_CUSTOMER.address3}</Text>
                        </View>
                    </View>
                </View>

                {/* TABLE */}
                <View style={styles.table}>
                    <View style={styles.tableHeader}>
                        <View style={[styles.tableHeaderCell, styles.colId]}><Text>#</Text></View>
                        <View style={[styles.tableHeaderCell, styles.colDesc]}><Text>Item & Description</Text></View>
                        <View style={[styles.tableHeaderCell, styles.colQty]}><Text>Qty</Text></View>
                        <View style={[styles.tableHeaderCell, styles.colRate]}><Text>Rate</Text></View>
                        <View style={[styles.tableHeaderCell, styles.colAmount]}><Text>Amount</Text></View>
                    </View>

                    {invoice.items.map((item, index) => (
                        <View key={index} style={styles.tableRow}>
                            <View style={[styles.tableCell, styles.colId]}><Text>{index + 1}</Text></View>
                            <View style={[styles.tableCell, styles.colDesc]}><Text>{item.name}</Text></View>
                            <View style={[styles.tableCell, styles.colQty]}><Text>{item.qty.toFixed(2)}</Text></View>
                            <View style={[styles.tableCell, styles.colRate]}><Text>{formatCurrency(item.rate)}</Text></View>
                            <View style={[styles.tableCell, styles.colAmount]}><Text>{formatCurrency(item.qty * item.rate)}</Text></View>
                        </View>
                    ))}
                    {/* Add empty rows if needed to fill space, skipping for now */}
                </View>

                {/* FOOTER */}
                <View style={styles.footer}>
                    <View style={styles.footerLeft}>
                        <Text style={styles.thankYou}>Thanks for shopping with us.</Text>
                        <Text style={styles.termsTitle}>Terms & Conditions</Text>
                        <Text style={styles.termsText}>
                            Full payment is due upon receipt of this invoice.
                            Late payments may incur additional charges or interest as per the applicable laws.
                        </Text>
                    </View>

                    <View style={styles.footerRight}>
                        <View style={styles.totalBox}>
                            {/* Using a blue block for all totals to match the "Balance Due" block look in image or just the list?
                  The image has a blue block containing Tax Rate, Total, Balance Due.
                  Let's make the whole container blue-ish.
              */}
                            <View style={[styles.totalRow, { backgroundColor: '#bfdbfe' }]}>
                                <Text>Tax Rate</Text>
                                <Text>{(invoice.tax_rate * 100).toFixed(2)}%</Text>
                            </View>
                            <View style={[styles.totalRow, { backgroundColor: '#bfdbfe' }]}>
                                <Text style={styles.totalLabel}>Total</Text>
                                <Text style={styles.totalValue}>{formatCurrency(invoice.total)}</Text>
                            </View>
                            <View style={[styles.totalRow, { backgroundColor: '#bfdbfe', borderTopWidth: 0 }]}>
                                <Text style={styles.totalLabel}>Balance Due</Text>
                                <Text style={styles.totalValue}>{formatCurrency(invoice.total)}</Text>
                            </View>
                        </View>
                    </View>
                </View>

            </Page>
        </Document>
    );
};

export default InvoiceDocument;
