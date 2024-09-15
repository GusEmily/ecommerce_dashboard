import pytest
 
def test_upper():
    assert 'foo'.upper() == 'FOO'
 
def test_isupper():
    # There can be more than one assert in a test
    assert 'FOO'.isupper()
    assert not 'Foo'.isupper()
 
def test_split():
    s = 'hello world'
    assert s.split() == ['hello', 'world']
    # Check that s.split fails when the separator is not a string
    with pytest.raises(TypeError):
        s.split(2)