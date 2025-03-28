const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql2");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("TRADING"));

const db = mysql.createConnection({
    host: "34.45.89.23",
    user: "root",
    
    database: "survey_db"
});

db.connect((err) => {
    if (err) {
        console.error("❌ Database connection failed:", err);
    } else {
        console.log("✅ Connected to MySQL Database");
    }
});



// API to handle survey responses for Questions 1-5 & 6-16
app.post("/submit", (req, res) => {
    const {
        first_name,
        last_name,
        email,
        trading_experience, 
        assets, 
        assets_other, 
        trading_frequency, 
        trading_strategy, 
        strategy_other, 
        platform_satisfaction, 
        comments, 
        features, 
        speed_reliability, 
        technical_issues, 
        technical_issue_details, 
        backtesting_usage, 
        backtesting_accuracy, 
        backtesting_improvements, 
        backtest_timeframe, 
        historical_data_importance, 
        learning_resources, 
        learning_resources_other, 
        feature_requests, 
        recommendation_score 
    } = req.body;

    // Convert array fields to JSON strings before storing in MySQL
    const assetsJson = assets ? JSON.stringify(assets) : "[]";
    const featuresJson = features ? JSON.stringify(features) : "[]";
    const learningResourcesJson = learning_resources ? JSON.stringify(learning_resources) : "[]";

    const sql = `
        INSERT INTO survey_responses 
        (first_name, last_name, email, trading_experience, assets, assets_other, trading_frequency, trading_strategy, strategy_other, 
        platform_satisfaction, comments, features, speed_reliability, technical_issues, 
        technical_issue_details, backtesting_usage, backtesting_accuracy, backtesting_improvements, 
        backtest_timeframe, historical_data_importance, learning_resources, learning_resources_other, 
        feature_requests, recommendation_score) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(sql, [
        first_name,
        last_name,
        email,
        trading_experience, 
        assetsJson, 
        assets_other, 
        trading_frequency, 
        trading_strategy, 
        strategy_other, 
        platform_satisfaction, 
        comments, 
        featuresJson, 
        speed_reliability, 
        technical_issues, 
        technical_issue_details, 
        backtesting_usage, 
        backtesting_accuracy, 
        backtesting_improvements, 
        backtest_timeframe, 
        historical_data_importance, 
        learningResourcesJson, 
        learning_resources_other, 
        feature_requests, 
        recommendation_score
    ], (err, result) => {
        if (err) {
            console.error("❌ Error inserting data:", err);
            return res.status(500).json({ error: "Database error" });
        }
        res.json({ message: "✅ Survey response saved!", id: result.insertId });
    });
});



const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});








