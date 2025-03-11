import json

def load_json_file(filepath, encoding='utf-8'):
    try:
        with open(filepath, 'r', encoding=encoding) as f:
            return json.load(f)
    except FileNotFoundError:
        print(f"Error: File not found: {filepath}")
    except json.JSONDecodeError as e:
        print(f"Error decoding JSON in {filepath}: {e}")
    return None

def combine_source_files():
    # Load all files individually to pinpoint errors
    descriptions = load_json_file('source descriptions.json')
    mappings = load_json_file('source mapping.json')
    orders = load_json_file('source orders.json')

    if descriptions is None or mappings is None or orders is None:
        print("Error loading one or more input files.")
        return None

    translations_en = load_json_file('translatedSourceMapping.json') or {}
    translations_he = load_json_file('translatedSourceMapping-Hebrew.json') or {}

    # Initialize the combined structure
    combined_data = {
        "countries": {}
    }

    # Process each country
    for country in mappings:
        # Initialize country entry
        if country not in combined_data["countries"]:
            combined_data["countries"][country] = {
                "sources": {},
                "orders": {}
            }
        
        # Add orders if available
        if country in orders:
            combined_data["countries"][country]["orders"] = orders[country]
        
        # Process each source in the country
        for source_id, source_name in mappings[country].items():
            # Initialize source entry
            combined_data["countries"][country]["sources"][source_id] = {
                "name": source_name,
                "description": "",
                "translations": {}
            }
            
            # Add description if available
            if country in descriptions and source_id in descriptions[country]:
                combined_data["countries"][country]["sources"][source_id]["description"] = descriptions[country][source_id]
            
            # Add English translation if available
            if country in translations_en and source_id in translations_en[country]:
                combined_data["countries"][country]["sources"][source_id]["translations"]["en"] = translations_en[country][source_id]
            else:
                # Use the mapping name as English translation if not available
                combined_data["countries"][country]["sources"][source_id]["translations"]["en"] = source_name
            
            # Add Hebrew translation if available
            if country in translations_he and source_id in translations_he[country]:
                combined_data["countries"][country]["sources"][source_id]["translations"]["he"] = translations_he[country][source_id]

    return combined_data

def main():
    combined_data = combine_source_files()
    if combined_data:
        # Save the combined data
        with open('combined_sources.json', 'w', encoding='utf-8') as f:
            json.dump(combined_data, f, ensure_ascii=False, indent=2)
        print("Successfully combined data into combined_sources.json")

if __name__ == "__main__":
    main()