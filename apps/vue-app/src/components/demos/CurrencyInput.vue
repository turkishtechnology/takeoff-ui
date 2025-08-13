<template>
  <div class="space-y-8">
    <TkCard>
      <template #header>
        <h2 class="text-2xl font-semibold">CurrencyInput Component Demo</h2>
      </template>
      
      <div class="space-y-6">
        <!-- Basic Currency Input -->
        <div>
          <h3 class="text-lg font-medium mb-3">Basic Currency Input</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TkCurrencyInput
              label="Amount (USD)"
              placeholder="Enter amount"
              currency="USD"
              v-model="basicAmount"
            />
            <TkCurrencyInput
              label="Price (EUR)"
              placeholder="Enter price"
              currency="EUR"
              v-model="basicPrice"
            />
          </div>
          <div class="mt-2 text-sm text-gray-600">
            USD Amount: {{ basicAmount || 'Not set' }} | EUR Price: {{ basicPrice || 'Not set' }}
          </div>
        </div>

        <!-- Different Currencies -->
        <div>
          <h3 class="text-lg font-medium mb-3">Different Currencies</h3>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <TkCurrencyInput
              label="US Dollar"
              currency="USD"
              currency-display="symbol"
              v-model="usdAmount"
              placeholder="$0.00"
            />
            <TkCurrencyInput
              label="Euro"
              currency="EUR"
              currency-display="symbol"
              v-model="eurAmount"
              placeholder="€0.00"
            />
            <TkCurrencyInput
              label="British Pound"
              currency="GBP"
              currency-display="symbol"
              v-model="gbpAmount"
              placeholder="£0.00"
            />
            <TkCurrencyInput
              label="Japanese Yen"
              currency="JPY"
              currency-display="symbol"
              v-model="jpyAmount"
              placeholder="¥0"
            />
            <TkCurrencyInput
              label="Turkish Lira"
              currency="TRY"
              currency-display="symbol"
              v-model="tryAmount"
              placeholder="₺0.00"
            />
            <TkCurrencyInput
              label="Canadian Dollar"
              currency="CAD"
              currency-display="symbol"
              v-model="cadAmount"
              placeholder="C$0.00"
            />
          </div>
        </div>

        <!-- Currency Display Options -->
        <div>
          <h3 class="text-lg font-medium mb-3">Currency Display Options</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TkCurrencyInput
              label="Symbol Display"
              currency="USD"
              currency-display="symbol"
              v-model="displaySymbol"
              placeholder="$1,234.56"
            />
            <TkCurrencyInput
              label="Code Display"
              currency="USD"
              currency-display="code"
              v-model="displayCode"
              placeholder="USD 1,234.56"
            />
            <TkCurrencyInput
              label="Name Display"
              currency="USD"
              currency-display="name"
              v-model="displayName"
              placeholder="1,234.56 US dollars"
            />
            <TkCurrencyInput
              label="Narrow Symbol"
              currency="USD"
              currency-display="narrowSymbol"
              v-model="displayNarrow"
              placeholder="$1,234.56"
            />
          </div>
        </div>

        <!-- Precision and Formatting -->
        <div>
          <h3 class="text-lg font-medium mb-3">Precision and Formatting</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TkCurrencyInput
              label="No Decimal Places"
              currency="USD"
              :precision="0"
              v-model="noPrecision"
              placeholder="$1234"
            />
            <TkCurrencyInput
              label="3 Decimal Places"
              currency="USD"
              :precision="3"
              v-model="highPrecision"
              placeholder="$1,234.567"
            />
            <TkCurrencyInput
              label="Auto Decimal"
              currency="USD"
              auto-decimal-mode
              v-model="autoDecimal"
              placeholder="Type 1234 → $12.34"
            />
            <TkCurrencyInput
              label="No Separator"
              currency="USD"
              :use-grouping="false"
              v-model="noSeparator"
              placeholder="$1234.56"
            />
          </div>
        </div>

        <!-- Minimum and Maximum Values -->
        <div>
          <h3 class="text-lg font-medium mb-3">Minimum and Maximum Values</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TkCurrencyInput
              label="Minimum $10"
              currency="USD"
              :min="10"
              v-model="minAmount"
              placeholder="Min: $10.00"
              hint="Minimum amount is $10"
            />
            <TkCurrencyInput
              label="Maximum $1000"
              currency="USD"
              :max="1000"
              v-model="maxAmount"
              placeholder="Max: $1000.00"
              hint="Maximum amount is $1000"
            />
            <TkCurrencyInput
              label="Range $50-$500"
              currency="USD"
              :min="50"
              :max="500"
              v-model="rangeAmount"
              placeholder="$50 - $500"
              hint="Amount must be between $50 and $500"
            />
          </div>
        </div>

        <!-- States and Validation -->
        <div>
          <h3 class="text-lg font-medium mb-3">States and Validation</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TkCurrencyInput
              label="Required Field"
              currency="USD"
              v-model="requiredAmount"
              placeholder="Required field"
              show-asterisk
              :error="!requiredAmount ? 'This field is required' : ''"
            />
            <TkCurrencyInput
              label="Disabled Input"
              currency="USD"
              v-model="disabledAmount"
              placeholder="Disabled"
              disabled
            />
            <TkCurrencyInput
              label="Invalid State"
              currency="USD"
              v-model="invalidAmount"
              placeholder="Invalid input"
              invalid
              error="Please enter a valid amount"
            />
            <TkCurrencyInput
              label="Read Only"
              currency="USD"
              v-model="readOnlyAmount"
              readonly
              hint="This field is read-only"
            />
          </div>
        </div>

        <!-- Sizes -->
        <div>
          <h3 class="text-lg font-medium mb-3">Input Sizes</h3>
          <div class="space-y-4">
            <TkCurrencyInput
              label="Small Size"
              currency="USD"
              size="small"
              v-model="smallAmount"
              placeholder="Small input"
            />
            <TkCurrencyInput
              label="Base Size (Default)"
              currency="USD"
              size="base"
              v-model="baseAmount"
              placeholder="Base input"
            />
            <TkCurrencyInput
              label="Large Size"
              currency="USD"
              size="large"
              v-model="largeAmount"
              placeholder="Large input"
            />
          </div>
        </div>

        <!-- Different Locales -->
        <div>
          <h3 class="text-lg font-medium mb-3">Different Locales</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TkCurrencyInput
              label="US Locale"
              currency="USD"
              locale="en-US"
              v-model="usLocale"
              placeholder="1,234.56"
            />
            <TkCurrencyInput
              label="German Locale"
              currency="EUR"
              locale="de-DE"
              v-model="germanLocale"
              placeholder="1.234,56"
            />
            <TkCurrencyInput
              label="French Locale"
              currency="EUR"
              locale="fr-FR"
              v-model="frenchLocale"
              placeholder="1 234,56"
            />
            <TkCurrencyInput
              label="Turkish Locale"
              currency="TRY"
              locale="tr-TR"
              v-model="turkishLocale"
              placeholder="1.234,56"
            />
          </div>
        </div>

        <!-- Advanced Features -->
        <div>
          <h3 class="text-lg font-medium mb-3">Advanced Features</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TkCurrencyInput
              label="Custom Prefix"
              currency="USD"
              prefix="Total: "
              v-model="prefixAmount"
              placeholder="Total: $0.00"
            />
            <TkCurrencyInput
              label="Custom Suffix"
              currency="USD"
              suffix=" (USD)"
              v-model="suffixAmount"
              placeholder="$0.00 (USD)"
            />
            <TkCurrencyInput
              label="Allow Negative"
              currency="USD"
              allow-negative
              v-model="negativeAmount"
              placeholder="Can be negative"
              hint="Negative values allowed"
            />
            <TkCurrencyInput
              label="Empty Value Null"
              currency="USD"
              empty-value="null"
              v-model="nullableAmount"
              placeholder="Empty = null"
            />
          </div>
        </div>

        <!-- Real-world Examples -->
        <div>
          <h3 class="text-lg font-medium mb-3">Real-world Examples</h3>
          <div class="space-y-4">
            <div class="border p-4 rounded-lg">
              <h4 class="font-semibold mb-3">Product Pricing Form</h4>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <TkCurrencyInput
                  label="Cost Price"
                  currency="USD"
                  v-model="productCost"
                  placeholder="Enter cost"
                  show-asterisk
                />
                <TkCurrencyInput
                  label="Selling Price"
                  currency="USD"
                  v-model="productPrice"
                  placeholder="Enter price"
                  show-asterisk
                />
                <TkCurrencyInput
                  label="Profit Margin"
                  currency="USD"
                  v-model="productProfit"
                  placeholder="Calculated"
                  readonly
                  :value="calculateProfit"
                />
              </div>
            </div>

            <div class="border p-4 rounded-lg">
              <h4 class="font-semibold mb-3">Budget Calculator</h4>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TkCurrencyInput
                  label="Monthly Income"
                  currency="USD"
                  v-model="monthlyIncome"
                  placeholder="Enter income"
                />
                <TkCurrencyInput
                  label="Monthly Expenses"
                  currency="USD"
                  v-model="monthlyExpenses"
                  placeholder="Enter expenses"
                />
                <TkCurrencyInput
                  label="Savings Goal"
                  currency="USD"
                  v-model="savingsGoal"
                  placeholder="Enter goal"
                />
                <TkCurrencyInput
                  label="Available for Savings"
                  currency="USD"
                  v-model="availableSavings"
                  readonly
                  :value="calculateSavings"
                  :error="availableSavings < 0 ? 'Expenses exceed income!' : ''"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- Interactive Demo -->
        <div>
          <h3 class="text-lg font-medium mb-3">Interactive Currency Input Demo</h3>
          <div class="space-y-4">
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label class="block text-sm font-medium mb-1">Currency</label>
                <select v-model="selectedCurrency" class="w-full px-3 py-2 border rounded">
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                  <option value="GBP">GBP</option>
                  <option value="JPY">JPY</option>
                  <option value="TRY">TRY</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium mb-1">Precision</label>
                <select v-model="selectedPrecision" class="w-full px-3 py-2 border rounded">
                  <option :value="0">0 decimals</option>
                  <option :value="2">2 decimals</option>
                  <option :value="3">3 decimals</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium mb-1">Display</label>
                <select v-model="selectedDisplay" class="w-full px-3 py-2 border rounded">
                  <option value="symbol">Symbol</option>
                  <option value="code">Code</option>
                  <option value="name">Name</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium mb-1">Size</label>
                <select v-model="selectedSize" class="w-full px-3 py-2 border rounded">
                  <option value="small">Small</option>
                  <option value="base">Base</option>
                  <option value="large">Large</option>
                </select>
              </div>
            </div>
            <div class="flex gap-4">
              <label class="flex items-center gap-2">
                <input type="checkbox" v-model="allowNegative" class="rounded">
                Allow Negative
              </label>
              <label class="flex items-center gap-2">
                <input type="checkbox" v-model="useGrouping" class="rounded">
                Use Grouping
              </label>
              <label class="flex items-center gap-2">
                <input type="checkbox" v-model="autoDecimalMode" class="rounded">
                Auto Decimal
              </label>
              <label class="flex items-center gap-2">
                <input type="checkbox" v-model="isDisabled" class="rounded">
                Disabled
              </label>
            </div>
            <div class="max-w-md">
              <TkCurrencyInput
                label="Interactive Demo"
                :currency="selectedCurrency"
                :precision="selectedPrecision"
                :currency-display="selectedDisplay"
                :size="selectedSize"
                :allow-negative="allowNegative"
                :use-grouping="useGrouping"
                :auto-decimal-mode="autoDecimalMode"
                :disabled="isDisabled"
                v-model="interactiveAmount"
                placeholder="Test the configuration"
              />
              <div class="mt-2 text-sm text-gray-600">
                Value: {{ interactiveAmount || 'Not set' }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </TkCard>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { TkCard, TkCurrencyInput } from '@takeoff-ui/vue';

// Basic amounts
const basicAmount = ref('');
const basicPrice = ref('');

// Different currencies
const usdAmount = ref('');
const eurAmount = ref('');
const gbpAmount = ref('');
const jpyAmount = ref('');
const tryAmount = ref('');
const cadAmount = ref('');

// Display options
const displaySymbol = ref('');
const displayCode = ref('');
const displayName = ref('');
const displayNarrow = ref('');

// Precision and formatting
const noPrecision = ref('');
const highPrecision = ref('');
const autoDecimal = ref('');
const noSeparator = ref('');

// Min/Max values
const minAmount = ref('');
const maxAmount = ref('');
const rangeAmount = ref('');

// States
const requiredAmount = ref('');
const disabledAmount = ref('1234.56');
const invalidAmount = ref('');
const readOnlyAmount = ref('999.99');

// Sizes
const smallAmount = ref('');
const baseAmount = ref('');
const largeAmount = ref('');

// Locales
const usLocale = ref('');
const germanLocale = ref('');
const frenchLocale = ref('');
const turkishLocale = ref('');

// Advanced features
const prefixAmount = ref('');
const suffixAmount = ref('');
const negativeAmount = ref('');
const nullableAmount = ref('');

// Real-world examples
const productCost = ref('');
const productPrice = ref('');
const productProfit = ref('');
const monthlyIncome = ref('');
const monthlyExpenses = ref('');
const savingsGoal = ref('');
const availableSavings = ref('');

// Interactive demo controls
const selectedCurrency = ref('USD');
const selectedPrecision = ref(2);
const selectedDisplay = ref('symbol');
const selectedSize = ref('base');
const allowNegative = ref(false);
const useGrouping = ref(true);
const autoDecimalMode = ref(false);
const isDisabled = ref(false);
const interactiveAmount = ref('');

// Computed values
const calculateProfit = computed(() => {
  const cost = parseFloat(productCost.value) || 0;
  const price = parseFloat(productPrice.value) || 0;
  const profit = price - cost;
  productProfit.value = profit > 0 ? profit.toString() : '';
  return profit > 0 ? profit.toString() : '';
});

const calculateSavings = computed(() => {
  const income = parseFloat(monthlyIncome.value) || 0;
  const expenses = parseFloat(monthlyExpenses.value) || 0;
  const available = income - expenses;
  availableSavings.value = available.toString();
  return available.toString();
});
</script>
