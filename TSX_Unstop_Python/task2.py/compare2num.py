# Compare two numbers entered by the user

num1 = float(input("Enter first number: "))
num2 = float(input("Enter second number: "))

if num1 > num2:
    print("First number is greater than second number.")
elif num1 < num2:
    print("First number is less than second number.")
else:
    print("Both numbers are equal.")