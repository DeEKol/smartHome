<script lang="ts">

</script>

<div><h2>Контроль работы температурных приборов (вентилятор, кондиционер, батарея)</h2>
    <p>(В разработке изменение данных через бд)</p>
    <table>
        <thead>
        <tr>
            <th>Status</th>
            <th>Min Temp (°C)</th>
            <th>Max Temp (°C)</th>
            <th>Cooling Rate</th>
            <th>Heating Rate</th>
        </tr>
        </thead>
        <tbody>
        <tr>
            <td>Freezing</td>
            <td>-50</td>
            <td>0</td>
            <td>disabled</td>
            <td>hight</td>
    </tr>
        <tr>
            <td>Cold</td>
            <td>1</td>
            <td>20</td>
            <td>disabled</td>
            <td>medium</td>
        </tr>
        <tr>
            <td>Comfortable</td>
            <td>21</td>
            <td>25</td>
            <td>low</td>
            <td>disabled</td>
        </tr>
        <tr>
            <td>Hot</td>
            <td>26</td>
            <td>40</td>
            <td>high</td>
            <td>disabled</td>
        </tr>
        </tbody>
    </table></div>

<style lang="scss">

</style>