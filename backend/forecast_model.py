from prophet import Prophet
from mock_data import get_historical_data
import pandas as pd

def run_forecast(city, periods=30):
    df = get_historical_data(city)
    model = Prophet()
    model.fit(df)
    future = model.make_future_dataframe(periods=periods)
    forecast = model.predict(future)
    # return only the forecast period (last `periods` days)
    forecast_period = forecast.tail(periods)[["ds", "yhat", "yhat_lower", "yhat_upper"]]
    return forecast_period.to_dict(orient="records")