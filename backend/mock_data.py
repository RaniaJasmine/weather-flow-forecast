import pandas as pd
from datetime import datetime, timedelta

def get_historical_data(city):
    """Return mock daily weather data for a given city."""
    if city == "New York":
        base_temp = 15
    elif city == "London":
        base_temp = 12
    else:  # Tokyo
        base_temp = 18

    dates = [datetime.today() - timedelta(days=i) for i in range(180, 0, -1)]
    temps = [base_temp + 10 * (i % 30) / 30 for i in range(180)]  # simple wave
    df = pd.DataFrame({"ds": dates, "y": temps})
    return df