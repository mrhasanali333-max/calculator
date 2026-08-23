"use strict";

const pageData = {
    "percentage-calculator.html": {
        name: "Percentage Calculator",
        description: "Calculate percentages quickly and accurately with this free online Percentage Calculator.",
        formula: "Percentage = (Part / Whole) x 100",
        example: "For a part of 25 and a whole of 200: (25 / 200) x 100 = 12.5%.",
        uses: "Use it for grades, statistics, discounts, comparisons, and everyday percentage calculations.",
        faqs: ["How do I calculate a percentage?", "What is the percentage formula?", "How do I calculate percentage increase?", "How do I calculate percentage decrease?"],
        related: [["discount-calculator.html", "Discount Calculator"], ["average-calculator.html", "Average Calculator"], ["simple-interest-calculator.html", "Simple Interest Calculator"]]
    },
    "age-calculator.html": {
        name: "Age Calculator",
        description: "Find an exact age in years, months, and days from a date of birth.",
        formula: "Age = Today - Date of birth",
        example: "Enter a date of birth and the calculator compares it with today's date to show the exact elapsed age.",
        uses: "Useful for birthdays, forms, eligibility checks, planning, and personal records.",
        faqs: ["How is age calculated?", "Can I calculate age in years and months?", "Does the calculator use today's date?", "Can I enter a future date of birth?"],
        related: [["date-calculator.html", "Date Calculator"], ["percentage-calculator.html", "Percentage Calculator"], ["average-calculator.html", "Average Calculator"]]
    },
    "bmi-calculator.html": {
        name: "BMI Calculator",
        description: "Calculate body mass index from weight and height with this free BMI Calculator.",
        formula: "BMI = Weight (kg) / Height (m)^2",
        example: "For 70 kg and 1.75 m: 70 / (1.75 x 1.75) = 22.9 BMI.",
        uses: "Use BMI as a general screening measure when reviewing weight relative to height; it is not medical advice.",
        faqs: ["What is the BMI formula?", "What does a BMI result mean?", "Should height be entered in centimeters?", "Is BMI a medical diagnosis?"],
        related: [["percentage-calculator.html", "Percentage Calculator"], ["average-calculator.html", "Average Calculator"], ["age-calculator.html", "Age Calculator"]]
    },
    "emi-calculator.html": {
        name: "Loan / EMI Calculator",
        description: "Estimate monthly loan payments, total repayment, and interest with this free EMI Calculator.",
        formula: "EMI = P x r x (1 + r)^n / ((1 + r)^n - 1)",
        example: "P is the loan principal, r is the monthly interest rate, and n is the number of monthly payments.",
        uses: "Compare loan terms, plan monthly budgets, and estimate repayment costs before applying for credit.",
        faqs: ["What does EMI mean?", "How is a monthly loan payment calculated?", "What happens when the interest rate is zero?", "Does this estimate include fees or taxes?"],
        related: [["simple-interest-calculator.html", "Simple Interest Calculator"], ["compound-interest-calculator.html", "Compound Interest Calculator"], ["percentage-calculator.html", "Percentage Calculator"]]
    },
    "date-calculator.html": {
        name: "Date Calculator",
        description: "Calculate the number of days between two dates quickly and accurately.",
        formula: "Date difference = End date - Start date",
        example: "Choose a start date and an end date to calculate the elapsed number of days between them.",
        uses: "Useful for deadlines, travel planning, project schedules, billing periods, and event planning.",
        faqs: ["How many days are between two dates?", "Are leap years included?", "Can the end date come before the start date?", "Does the result include the selected dates?"],
        related: [["age-calculator.html", "Age Calculator"], ["percentage-calculator.html", "Percentage Calculator"], ["calculators.html", "All Calculators"]]
    },
    "discount-calculator.html": {
        name: "Discount Calculator",
        description: "Find the discount amount, savings, and final sale price instantly.",
        formula: "Savings = Original price x Discount rate / 100; Final price = Original price - Savings",
        example: "For $80 at 25% off: savings are $20 and the final price is $60.",
        uses: "Compare sale prices, check store discounts, and calculate savings while shopping.",
        faqs: ["How do I calculate a discount?", "How is the final sale price found?", "Can I calculate a percentage discount?", "Does this include sales tax?"],
        related: [["percentage-calculator.html", "Percentage Calculator"], ["average-calculator.html", "Average Calculator"], ["tip-calculator.html", "Tip Calculator"]]
    },
    "compound-interest-calculator.html": {
        name: "Compound Interest Calculator",
        description: "Calculate compound growth, total amount, and interest over time.",
        formula: "A = P(1 + r/n)^(nt); Interest = A - P",
        example: "P is principal, r is annual rate as a decimal, n is compounding frequency, and t is time in years.",
        uses: "Estimate savings growth, investment returns, and the effect of different compounding schedules.",
        faqs: ["What is compound interest?", "What do P, r, n, and t mean?", "How often can interest compound?", "Does this account for deposits or taxes?"],
        related: [["simple-interest-calculator.html", "Simple Interest Calculator"], ["emi-calculator.html", "Loan / EMI Calculator"], ["percentage-calculator.html", "Percentage Calculator"]]
    },
    "length-calculator.html": {
        name: "Length Converter",
        description: "Convert common metric and imperial length units with this free converter.",
        formula: "Converted value = Value x Source unit factor / Target unit factor",
        example: "To convert 1 meter to centimeters: 1 x 1 / 0.01 = 100 centimeters.",
        uses: "Useful for schoolwork, travel, construction, shopping, and everyday unit conversion.",
        faqs: ["Which length units can I convert?", "How are metric conversions calculated?", "Can I convert miles to kilometers?", "Are conversion results rounded?"],
        related: [["weight-calculator.html", "Weight Converter"], ["temperature-calculator.html", "Temperature Converter"], ["calculators.html", "All Calculators"]]
    },
    "weight-calculator.html": {
        name: "Weight Converter",
        description: "Convert kilograms, grams, pounds, ounces, and stones quickly.",
        formula: "Converted value = Value x Source factor / Target factor",
        example: "To convert 1 kilogram to grams: 1 x 1 / 0.001 = 1,000 grams.",
        uses: "Use it for recipes, shipping, fitness, travel, and comparing metric and imperial measurements.",
        faqs: ["Which weight units are supported?", "How many grams are in a kilogram?", "Can I convert pounds to kilograms?", "Are results rounded?"],
        related: [["length-calculator.html", "Length Converter"], ["temperature-calculator.html", "Temperature Converter"], ["calculators.html", "All Calculators"]]
    },
    "temperature-calculator.html": {
        name: "Temperature Converter",
        description: "Convert Celsius, Fahrenheit, and Kelvin temperatures instantly.",
        formula: "F = C x 9/5 + 32; K = C + 273.15",
        example: "To convert 20 C to Fahrenheit: 20 x 9/5 + 32 = 68 F.",
        uses: "Useful for weather, cooking, science, travel, and comparing temperature scales.",
        faqs: ["How do I convert Celsius to Fahrenheit?", "What is absolute zero in Kelvin?", "Which temperature scales are supported?", "Are decimal temperatures supported?"],
        related: [["length-calculator.html", "Length Converter"], ["weight-calculator.html", "Weight Converter"], ["calculators.html", "All Calculators"]]
    },
    "tip-calculator.html": {
        name: "Tip Calculator",
        description: "Calculate a tip, total bill, and per-person share quickly.",
        formula: "Tip = Bill x Tip rate / 100; Total = Bill + Tip",
        example: "For a $50 bill and a 20% tip: tip is $10 and the total is $60.",
        uses: "Use it for restaurants, delivery, services, and splitting a bill estimate.",
        faqs: ["How much tip should I leave?", "How is the total bill calculated?", "Can I calculate a percentage tip?", "Does the result split the bill between people?"],
        related: [["percentage-calculator.html", "Percentage Calculator"], ["discount-calculator.html", "Discount Calculator"], ["average-calculator.html", "Average Calculator"]]
    },
    "average-calculator.html": {
        name: "Average Calculator",
        description: "Calculate the mean, sum, minimum, and maximum of a list of numbers.",
        formula: "Average = Sum of values / Number of values",
        example: "For 10, 20, and 30: (10 + 20 + 30) / 3 = 20.",
        uses: "Useful for grades, test scores, budgets, measurements, and data summaries.",
        faqs: ["How is an average calculated?", "Can I enter decimal numbers?", "How should I separate values?", "What is the difference between average and median?"],
        related: [["percentage-calculator.html", "Percentage Calculator"], ["simple-interest-calculator.html", "Simple Interest Calculator"], ["calculators.html", "All Calculators"]]
    },
    "simple-interest-calculator.html": {
        name: "Simple Interest Calculator",
        description: "Calculate simple interest and the total amount from principal, rate, and time.",
        formula: "Simple interest = Principal x Rate x Time / 100; Total = Principal + Interest",
        example: "For $1,000 at 5% for 2 years: interest is $100 and total is $1,100.",
        uses: "Estimate straightforward interest on savings, loans, and short-term financial agreements.",
        faqs: ["What is the simple interest formula?", "What does principal mean?", "Should the rate be entered as a percentage?", "How is total repayment calculated?"],
        related: [["compound-interest-calculator.html", "Compound Interest Calculator"], ["emi-calculator.html", "Loan / EMI Calculator"], ["percentage-calculator.html", "Percentage Calculator"]]
    }
};

function addSeoContent() {
    const page = pageData[location.pathname.split("/").pop()] || pageData["percentage-calculator.html"];
    const pageUrl = "https://fastcalculator.website/" + location.pathname.split("/").pop();
    document.title = page.name + " | Fast Calculator";

    const description = document.querySelector('meta[name="description"]') || document.head.appendChild(document.createElement("meta"));
    description.name = "description";
    description.content = page.description;

    const canonical = document.querySelector('link[rel="canonical"]') || document.head.appendChild(document.createElement("link"));
    canonical.rel = "canonical";
    canonical.href = pageUrl;

    const main = document.querySelector(".page-layout");
    if (!main || document.querySelector(".seo-content")) return;

    const content = document.createElement("section");
    content.className = "seo-content prose";
    const faqMarkup = page.faqs.map(question => "<details><summary>" + question + "</summary><p>" + page.description + " Use the inputs above and review the formula to understand the result.</p></details>").join("");
    const relatedMarkup = page.related.map(([href, label]) => "<a href=\"" + href + "\">" + label + "</a>").join(" <span aria-hidden=\"true\">&rarr;</span> ");
    content.innerHTML = `<h2>About ${page.name}</h2><p>${page.description} Enter the values in the calculator above to get a clear result on desktop or mobile.</p><h2>How to use this calculator</h2><ol><li>Enter the requested values.</li><li>Check the units or dates.</li><li>Select Calculate.</li><li>Review the result shown instantly.</li></ol><h2>Formula</h2><p><strong>${page.formula}</strong></p><h2>Step-by-step example</h2><p>${page.example}</p><h2>Benefits and uses</h2><p>${page.uses}</p><h2>Frequently asked questions</h2>${faqMarkup}<h2>Related calculators</h2><p class="related-links">${relatedMarkup}</p>`;
    main.parentNode.appendChild(content);

    const schema = document.createElement("script");
    schema.type = "application/ld+json";
    schema.textContent = JSON.stringify({
        "@context": "https://schema.org",
        "@graph": [
            {"@type": "BreadcrumbList", "itemListElement": [{"@type": "ListItem", "position": 1, "name": "Calculators", "item": "https://fastcalculator.website/calculators.html"}, {"@type": "ListItem", "position": 2, "name": page.name, "item": pageUrl}]},
            {"@type": "SoftwareApplication", "name": page.name, "applicationCategory": "UtilitiesApplication", "operatingSystem": "Web", "url": pageUrl, "description": page.description, "offers": {"@type": "Offer", "price": "0", "priceCurrency": "USD"}},
            {"@type": "FAQPage", "mainEntity": page.faqs.map(question => ({"@type": "Question", "name": question, "acceptedAnswer": {"@type": "Answer", "text": page.description + " Use the calculator inputs to calculate your answer."}}))}
        ]
    });
    document.head.appendChild(schema);
}

document.addEventListener("DOMContentLoaded", addSeoContent);
