def to_dict(string):
    elements = string.splitlines()
    dictionary = {}
    for element in elements:
        key, value = element.split(' - ')
        dictionary.update({key: value})

    return dictionary

def co(string):
     dictionary = {}
     for s in string:
             dictionary.update({s:s})
     return dictionary

print(co([
        "business",
        "entertainment",
        "environment",
        "food",
        "health",
        "politics",
        "science",
        "sports",
        "technology",
        "top",
        "world",
    ]))